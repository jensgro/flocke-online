module.exports = function(collection) {
  return collection
    .getFilteredByGlob("./src/content/infos/*.md").sort((a,b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
};
