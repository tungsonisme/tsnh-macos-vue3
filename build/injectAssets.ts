import fs from 'fs';

const extensions = ['.jpg', '.jpeg', '.png', '.svg'];

const injectAssets = (mode: string) => {
  const result = { images: [] };

  if (mode === 'production') {
    if (!fs.existsSync('dist/assets')) {
      return;
    }

    const assets = fs.readdirSync('dist/assets');

    assets.forEach((asset) => {
      if (extensions.find((ext) => asset.endsWith(ext))) {
        result.images.push(`/assets/${asset}`);
      }
    });

    fs.writeFileSync('dist/asset-manifest.json', JSON.stringify(result));
  } else {
    const folders = ['src/assets/icons', 'src/assets/images'];

    folders.forEach((folder) => {
      const images = fs.readdirSync(folder);
      images.forEach((image) => {
        result.images.push(`${folder}/${image}`);
      });
    });

    fs.writeFileSync('public/asset-manifest.json', JSON.stringify(result));
  }
};

export default injectAssets;
