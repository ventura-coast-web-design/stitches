const sass = require("sass");
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(eleventyConfig) {
  // Add environment variables to global data
  eleventyConfig.addGlobalData("env", process.env);

  // Add custom shortcode for Instagram embeds
  eleventyConfig.addShortcode("instagram", function(url) {
    return `<div class="instagram-embed">
      <iframe src="${url}/embed" 
              width="400" 
              height="480" 
              frameborder="0" 
              scrolling="no" 
              allowtransparency="true">
      </iframe>
    </div>`;
  });

  // Add custom shortcode for TikTok embeds
  eleventyConfig.addShortcode("tiktok", function(url) {
    // Extract video ID from TikTok URL
    const videoId = url.split('/video/')[1];
    return `<div class="tiktok-embed">
      <blockquote class="tiktok-embed" cite="${url}" data-video-id="${videoId}" style="max-width: 325px; min-width: 325px;">
        <section></section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>`;
  });

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