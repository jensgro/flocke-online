module.exports = function(items) {
  let selected = items[Math.floor(Math.random() * items.length)];
  return selected;
}
