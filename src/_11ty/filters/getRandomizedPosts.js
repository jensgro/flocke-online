module.exports = function(category) {
  collection.getAll().filter((post) => post.data.category)
  .sort(() => {
    return 0.5 - Math.random();
  })
  // Optional limit, remove if unwanted
  .slice(0, 3)
}
