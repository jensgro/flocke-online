module.exports = function(collection) {
  return collection
  .getAllSorted()
  .filter((post) => "hauptgerichte" === post.data.category)
  .sort(alphaSortTitle);

  return collection.getAll().filter((post) => post.data.category  == "hauptgerichte");
}
