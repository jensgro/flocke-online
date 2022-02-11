const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const Ingredients = require("./_11ty/ingredients");
const Recipe = require("./_11ty/recipe-content");
const Intro = require("./_11ty/recipe-intro");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("recipe", "layouts/recipe.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
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

  // eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
  eleventyConfig.addCollection("randomList", require("./_11ty/getRandomList"));
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


   // Paired shortcodes
   eleventyConfig.addPairedShortcode('Ingredients', Ingredients);
   eleventyConfig.addPairedShortcode('Recipe', Recipe);
   eleventyConfig.addPairedShortcode('Intro', Intro);
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

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
