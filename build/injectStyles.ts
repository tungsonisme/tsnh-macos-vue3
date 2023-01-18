import fs from 'fs';

const PATH = 'src/styles';

const getFiles = (path: string) => {
  const files = [];
  for (const file of fs.readdirSync(path)) {
    const fullPath = path + '/' + file;

    if (fs.lstatSync(fullPath).isDirectory()) {
      getFiles(fullPath).forEach((x) => files.push(file + '/' + x));
    } else {
      if (file.endsWith('.scss')) {
        files.push(`${PATH}/${file}`);
      }
    }
  }
  return files;
};

const injectStyles = async () => {
  const files = await getFiles(PATH);
  return files.map((file) => `@import '${file}';`).join('\n');
};

export default injectStyles;
