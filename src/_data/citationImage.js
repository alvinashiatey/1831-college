const { AssetCache } = require("@11ty/eleventy-cache-assets");
const fetch = require("node-fetch");

//Images for the citation are loaded from Arena (https://www.are.na/alvin-ashiatey/1831-college-new-haven)
async function citationImages() {
  let channelSlug = "1831-college-new-haven";
  let contentsURL = `https://api.are.na/v2/channels/${channelSlug}?sort=position&order=asc&per=100`;
  const response = await fetch(contentsURL);
  const data = await response.json();
  const imageData = await data.contents.map((content) => {
    return {
      id: content.id,
      title: content.title,
      image: {
        large: content.image.original.url,
      },
    };
  });
  return imageData;
}

module.exports = async () => {
  let asset = new AssetCache("black-college-images");
  if (asset.isCacheValid("1d")) {
    return asset.getCachedValue();
  }
  let imageData = await citationImages();

  asset.save(imageData, "json");
  return imageData;
};
