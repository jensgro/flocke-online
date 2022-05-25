module.exports = function(collection) {
  const tagsSet = new Set()
  collection
    .getAll()
    .forEach((item) => {
      if (!item.data.tags) return
      item.data.tags
        // Das ist zum Aussortieren gedacht.
        .filter((tag) => !['rezept'].includes(tag))
        .forEach((tag) => tagsSet.add(tag))
    })
  return [...tagsSet].sort((a, b) => a.localeCompare(b))
}
