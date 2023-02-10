module.exports = function(collection) {
  return collection.getAll().filter((post) => post.data.category);
}


eleventyConfig.addCollection("specialCollection", function (collection) {
  return collection
});
