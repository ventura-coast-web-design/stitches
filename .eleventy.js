const sass = require("sass");
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(eleventyConfig) {
  // Add environment variables to global data
  eleventyConfig.addGlobalData("env", process.env);
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/css");

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("./src/css/main.css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}; 