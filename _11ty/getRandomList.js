module.exports = function(collection) {
  let randomSet = new Set();
  collection.getAllSorted().forEach(function(item) {

  });
  // returning an array in addCollection works in Eleventy 0.5.3
  return [...randomSet];
};
