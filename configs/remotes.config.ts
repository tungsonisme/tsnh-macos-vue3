import * as fs from 'fs';
import shell from 'shelljs';

const REMOTES_DIR = './remotes';
const PUBLIC_REMOTES_DIR = 'public/remotes';
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

const initializeRemotes = async ({
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
  const viteRegisteredApps: { app: string; component: string }[] = [];

  // read config files
  log(`reading config ${REMOTES_CONFIG_FILE} ...`);
  const remotesConfigRawData = fs.readFileSync(REMOTES_CONFIG_FILE);
  const { remotes: remoteConfigs, productionHost } = JSON.parse(
    remotesConfigRawData.toString()
  );
  const remotesDevConfigRawData = fs.readFileSync(REMOTES_DEV_CONFIG_FILE);
  const { remotes: remoteDevConfigs } = JSON.parse(
    remotesDevConfigRawData.toString()
  );

  // generate remotes config for federation plugin
  remoteConfigs.forEach(({ name, git }) => {
    const appFolderName = git.split('/')[git.split('/').length - 1];

    // update remotes from Github
    let remotePrefix: string;
    if (mode === 'development' || previewMode) {
      remotePrefix = `http://localhost:${port}`;
    } else if (mode === 'production') {
      remotePrefix = productionHost;
    }
    remotes[name] = `${remotePrefix}/remotes/${name}/remoteEntry.js`;

    if (fs.existsSync(appFolderName)) {
      // cd into project
      shell.cd(appFolderName);

      // pull the latest code
      shell.exec('git pull', { silent: true });
    } else {
      // clone project
      shell.exec(`git clone ${git}`, { silent: true });

      // cd into project
      shell.cd(appFolderName);
    }

    // update remotes from local
    const devConfig = remoteDevConfigs.find((config) => config.name === name);
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

      // install dependencies
      shell.exec('pnpm install', { silent: true });

      // build project
      shell.exec('pnpm run build', { silent: true });

      // copy built bundles into public/remotes
      fs.cpSync(`dist/assets`, `../../${PUBLIC_REMOTES_DIR}/${name}`, {
        recursive: true,
      });
    }

    // set viteRegisteredApps
    const files = fs.readdirSync('src/exposes');
    files.forEach((fileName) => {
      const component = fileName.split('.vue')[0];
      viteRegisteredApps.push({
        app: name,
        component,
      });
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

  return { remotes, viteRegisteredApps };
};

export default initializeRemotes;
