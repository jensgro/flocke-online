const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("getRandom", function(items) {
    let selected = items[Math.floor(Math.random() * items.length)];
    return selected;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addCollection('recipe', collection => {
    return [...collection.getFilteredByGlob('./recipe/*.md')];
  });

  eleventyConfig.addCollection('tagList', (collectionApi) => {
    const tagsSet = new Set()
    collectionApi.getAll().forEach((item) => {
      if (!item.data.tags) return
      item.data.tags
        // Das ist zum Aussortieren gedacht.
        .filter((tag) => !['rezept'].includes(tag))
        .forEach((tag) => tagsSet.add(tag))
    })
    return [...tagsSet].sort((a, b) => a.localeCompare(b))
  })

  // Die Rezepte werden aufsteigend nach Titel sortiert.
  // Standard ist das Datum.
  // Leider gibt es keine einfache API-Methode.
  // https://github.com/11ty/eleventy/issues/411
  eleventyConfig.addCollection("recipesDescending", (collection) =>
    collection.getFilteredByGlob("./recipe/*.md").sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
  );

  eleventyConfig.addCollection("infosDescending", (collection) =>
    collection.getFilteredByGlob("./infos/*.md").sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
  );

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({"scss/fonts": "css/fonts"});

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
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
