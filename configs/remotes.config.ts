import * as fs from 'fs';
import shell from 'shelljs';

const REMOTES = [
  {
    name: 'pokemon',
    git: 'https://github.com/tungsonisme/tsnh-pokemon-vue3',
  },
];

const REMOTES_DIR = './remotes';

const initializeRemotes = async (
  port: number
): Promise<Record<string, string>> => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  if (fs.existsSync(REMOTES_DIR)) {
    fs.rmdirSync(REMOTES_DIR, { recursive: true });
  }

  fs.mkdirSync(REMOTES_DIR);
  shell.cd(REMOTES_DIR);

  const result: Record<string, string> = {};

  REMOTES.forEach(({ name, git }) => {
    const appFolderName = git.split('/')[git.split('/').length - 1];

    shell.exec(`git clone ${git}`);
    shell.cd(appFolderName);
    shell.exec('pnpm install');
    shell.exec('pnpm run build');
    fs.cpSync(`dist/assets`, `../../public/remotes/${name}`, {
      recursive: true,
    });
    shell.cd('..');
    shell.cd('..');
    fs.rmdirSync(REMOTES_DIR, { recursive: true });

    result[name] = `http://localhost:${port}/remotes/${name}/remoteEntry.js`;
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return result;
};

export default initializeRemotes;
