const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// filters
const htmlDateString = require("./src/_11ty/filters/date.js").htmlDateString;
const head = require("./src/_11ty/filters/head.js");
const getRandom = require("./src/_11ty/filters/getRandom.js");

// collections
const recipe = require("./src/_11ty/collections/recipe.js");
const recipesDescending = require("./src/_11ty/collections/recipesDescending.js");
const infosDescending = require("./src/_11ty/collections/infosDescending.js");
const tagList = require("./src/_11ty/collections/tagList.js");

const {
  allTags,
  maincourseCollection,
  maincourseRandom,
  sidedishCollection,
  sidedishRandom,
  otherCollection,
  otherRandom,
  knowledgeCollection,
  knowledgeRandom
} = require("./src/_11ty/collections/collections.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("head", head);
  eleventyConfig.addFilter("getRandom", getRandom);

  eleventyConfig.addCollection("recipe", recipe);
  eleventyConfig.addCollection("recipesDescending", recipesDescending);
  eleventyConfig.addCollection("infosDescending", infosDescending);
  eleventyConfig.addCollection("tagList", tagList);

  eleventyConfig.addCollection("allTags", allTags);
  eleventyConfig.addCollection("maincourseCollection", maincourseCollection);
  eleventyConfig.addCollection("maincourseRandom", maincourseRandom);
  eleventyConfig.addCollection("sidedishCollection", sidedishCollection);
  eleventyConfig.addCollection("sidedishRandom", sidedishRandom);
  eleventyConfig.addCollection("otherCollection", otherCollection);
  eleventyConfig.addCollection("otherRandom", otherRandom);
  eleventyConfig.addCollection("allknowledgeCollectionTags", knowledgeCollection);
  eleventyConfig.addCollection("knowledgeRandom", knowledgeRandom);


  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy({ "./src/assets/scss/fonts": "assets/css/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/static/": "/" });

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

  eleventyConfig.setServerOptions({
    showAllHosts: true,
    showVersion: true
  });

  return {
    templateFormats: [
      "html",
      "md",
      "njk",
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
