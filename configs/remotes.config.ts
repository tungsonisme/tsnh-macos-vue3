import * as fs from 'fs';
import shell from 'shelljs';

const REMOTES_DIR = './remotes';
const PUBLIC_REMOTES_DIR = 'public/remotes';
const BUILD_DIR = 'dist';
const CONFIG_FILE = '../.remotesrc.json';

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
}: {
  mode: string;
  port: number;
  previewMode: boolean;
}): Promise<Record<string, string>> => {
  cleanFolders();

  // cd into remotes dir
  shell.cd(REMOTES_DIR);

  const remotes: Record<string, string> = {};

  // read config files
  log(`reading config ${CONFIG_FILE} ...`);
  const rawData = fs.readFileSync(CONFIG_FILE);
  const { remotes: remoteConfigs, productionHost } = JSON.parse(
    rawData.toString()
  );

  // generate remotes config for federation plugin
  remoteConfigs.forEach(({ name, git }) => {
    log(`setting up "${name}" from "${git}" ...`);

    const appFolderName = git.split('/')[git.split('/').length - 1];

    let remotePrefix: string;
    if (mode === 'development' || previewMode) {
      remotePrefix = `http://localhost:${port}`;
    } else if (mode === 'production') {
      remotePrefix = productionHost;
    }
    remotes[name] = `${remotePrefix}/remotes/${name}/remoteEntry.js`;

    if (fs.existsSync(appFolderName)) {
      log(`[${name}] pulling the latest code ...`);
      // cd into project
      shell.cd(appFolderName);
      // pull the latest code
      shell.exec('git pull', { silent: true });
    } else {
      log(`[${name}] cloning the latest code ...`);
      // clone project
      shell.exec(`git clone ${git}`, { silent: true });
      // cd into project
      shell.cd(appFolderName);
    }

    // install dependencies
    shell.exec('pnpm install', { silent: true });
    // build project
    shell.exec('pnpm run build', { silent: true });
    // copy built bundles into public/remotes
    fs.cpSync(`dist/assets`, `../../${PUBLIC_REMOTES_DIR}/${name}`, {
      recursive: true,
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

  return remotes;
};

export default initializeRemotes;
