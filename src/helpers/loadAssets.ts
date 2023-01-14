const loadImage = async (src: string) => {
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = reject;
    img.src = src;
  });
};

const loadAssets = async () => {
  const response = await fetch('/asset-manifest.json');
  const result = await response.json();
  const images = result.images as string[];

  await Promise.all(images.map((image) => loadImage(image)));
};

export default loadAssets;
