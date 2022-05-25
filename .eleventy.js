const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// filters
const htmlDateString = require("./src/_11ty/filters/date.js").htmlDateString;
const head = require("./src/_11ty/filters/head.js");

// collections
const recipe = require("./src/_11ty/collections/recipe.js");
const recipesDescending = require("./src/_11ty/collections/recipesDescending.js");
const infosDescending = require("./src/_11ty/collections/infosDescending.js");
const tagList = require("./src/_11ty/collections/tagList.js");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("head", head);

  eleventyConfig.addCollection("recipe", recipe);
  eleventyConfig.addCollection("recipesDescending", recipesDescending);
  eleventyConfig.addCollection("infosDescending", infosDescending);
  eleventyConfig.addCollection("tagList", tagList);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy({"./src/assets/img": "/img"});
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({"./src/assets/scss/fonts": "css/fonts"});
  eleventyConfig.addPassthroughCopy({"./src/static/":"/"});

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });

   // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
