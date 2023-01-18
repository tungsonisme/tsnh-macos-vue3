import * as fs from 'fs';
import shell from 'shelljs';

const REMOTES = 'remotes';
const REMOTES_DIR = `./${REMOTES}`;
const PUBLIC_REMOTES_DIR = `public/${REMOTES}`;
const BUILD_DIR = 'dist';
const REMOTES_CONFIG_FILE = '../.remotesrc.json';
const REMOTES_DEV_CONFIG_FILE = '../.remotesdevrc.json';

const log = (mess: string) => console.log(`[remotes] ${mess}`);

function cleanFolders() {
  log('cleaning folders ...');

  // remove build dir
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }

  // create remotes dir if it does not exist
  if (!fs.existsSync(REMOTES_DIR)) {
    fs.mkdirSync(REMOTES_DIR);
  }

  // remove public remotes dir
  if (fs.existsSync(PUBLIC_REMOTES_DIR)) {
    fs.rmSync(PUBLIC_REMOTES_DIR, { recursive: true });
  }
}

const initializeRemoteRepos = async ({
  mode,
  port,
  previewMode,
  localMode,
}: {
  mode: string;
  port: number;
  previewMode: boolean;
  localMode: boolean;
}) => {
  cleanFolders();

  // cd into remotes dir
  shell.cd(REMOTES_DIR);

  const remotes: Record<string, string> = {};
  const viteVueApps: { app: string; component: string }[] = [];
  const viteReactApps: { app: string; component: string }[] = [];

  // read config files
  log(`reading config ${REMOTES_CONFIG_FILE} ...`);
  const remotesConfigRawData = fs.readFileSync(REMOTES_CONFIG_FILE);
  const { remotes: remoteConfigs, productionHost } = JSON.parse(
    remotesConfigRawData.toString()
  );

  let remoteDevConfigs;
  if (mode !== 'production') {
    const remotesDevConfigRawData = fs.readFileSync(REMOTES_DEV_CONFIG_FILE);
    const { remotes } = JSON.parse(remotesDevConfigRawData.toString());
    remoteDevConfigs = remotes;
  }

  // generate remotes config for federation plugin
  remoteConfigs.forEach(({ name, git, type }) => {
    const appFolderName = git.split('/')[git.split('/').length - 1];

    // update remotes from Github
    let remotePrefix: string;
    if (mode === 'development' || previewMode) {
      remotePrefix = `http://localhost:${port}`;
    } else if (mode === 'production') {
      remotePrefix = productionHost;
    }
    remotes[name] = `${remotePrefix}/${REMOTES}/${name}/remoteEntry.js`;

    let needToInstallAndBuild = true;
    if (fs.existsSync(appFolderName)) {
      // cd into project
      shell.cd(appFolderName);

      // pull the latest code
      const gitPullResult = shell.exec('git pull', { silent: true });

      if (gitPullResult.stdout.includes('Already up to date')) {
        needToInstallAndBuild = false;
      }
    } else {
      // clone project
      shell.exec(`git clone ${git}`, { silent: true });

      // cd into project
      shell.cd(appFolderName);
    }

    // update remotes from local
    const devConfig = remoteDevConfigs?.find((config) => config.name === name);
    if (
      localMode &&
      devConfig &&
      devConfig.port &&
      Number.isInteger(devConfig.port)
    ) {
      log(`setting up "${name}" from localhost:${devConfig.port} ...`);

      remotes[
        name
      ] = `http://localhost:${devConfig.port}/assets/remoteEntry.js`;
    } else {
      log(`setting up "${name}" from "${git}" ...`);

      if (needToInstallAndBuild) {
        // install dependencies
        shell.exec('pnpm install', { silent: true });
        shell.exec('pnpm install -D', { silent: true });

        // build project
        shell.exec('pnpm run build', { silent: true });
      }

      // copy built bundles into public/.remotes
      fs.cpSync(`dist/assets`, `../../${PUBLIC_REMOTES_DIR}/${name}`, {
        recursive: true,
      });
    }

    // set viteVueApps
    const files = fs.readdirSync('src/exposes');
    files.forEach((fileName) => {
      if (fileName.endsWith('.vue') && type === 'vue') {
        const component = fileName.split('.vue')[0];
        viteVueApps.push({
          app: name,
          component,
        });
      }

      if (fileName.endsWith('.tsx') && type === 'react') {
        const component = fileName.split('.tsx')[0];
        viteReactApps.push({
          app: name,
          component,
        });
      }
    });

    // cd out to process next project
    shell.cd('..');
  });

  // wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  log(`generated remotes:`);
  Object.entries(remotes).forEach(([key, value]) => {
    log(`+++ ${key}: ${value}`);
  });
  console.log('');
  shell.cd('..');

  // inject apps
  process.env.VITE_MACOS_REMOTE_APPS = JSON.stringify(remoteConfigs);

  return { remotes, viteVueApps, viteReactApps };
};

export default initializeRemoteRepos;
