// Die Rezepte werden aufsteigend nach Titel sortiert.
// Standard ist das Datum.
// Leider gibt es keine einfache API-Methode.
// https://github.com/11ty/eleventy/issues/411
module.exports = function(collection) {
  return collection
    .getFilteredByGlob("./src/content/recipe/*.md").sort((a,b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
}
