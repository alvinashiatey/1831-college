const markdownIt = require("markdown-it");
const INPUT_DIR = "src";
const OUTPUT_DIR = "_site";

const PATH_PREFIX = "/";

module.exports = function (eleventyConfig) {
  const configuredMdLibrary = markdownIt({ html: true }).disable("code");
  eleventyConfig.setLibrary("md", configuredMdLibrary);

  const imageShortcode = require("./src/utils/images");

  const {
    viteLegacyScriptTag,
    viteScriptTag,
    viteLinkStylesheetTags,
    viteLinkModulePreloadTags,
  } = require("./src/utils/vite");

  eleventyConfig.addNunjucksAsyncShortcode("viteScriptTag", viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLegacyScriptTag",
    viteLegacyScriptTag
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkStylesheetTags",
    viteLinkStylesheetTags
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkModulePreloadTags",
    viteLinkModulePreloadTags
  );
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Transforms
  const htmlMinTransform = require("./src/transforms/html-min-transform.js");
  const googleFont = require("./src/utils/font");
  googleFont();

  // Create a helpful production flag
  const isProduction = process.env.NODE_ENV === "production";

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform("htmlmin", htmlMinTransform);
  }

  return {
    templateFormats: ["md", "njk", "html"],
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: INPUT_DIR,
      output: OUTPUT_DIR,
      includes: "_includes",
      data: "_data",
    },
  };
};
