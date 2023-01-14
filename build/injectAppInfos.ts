import fs from 'fs';

const injectAppInfos = () => {
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
  const { version, dependencies, devDependencies } = packageJson;

  process.env.VITE_MACOS_VERSION = version;
  process.env.VITE_VUE_VERSION = dependencies.vue;
  process.env.VITE_KERNEL_VERSION = dependencies['tsnh-macos-kernel'];
  process.env.VITE_PINIA_VERSION = dependencies.pinia;
  process.env.VITE_VITE_VERSION = devDependencies.vite;
};

export default injectAppInfos;
