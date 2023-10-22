module.exports = function(items) {
  let selected = items[Math.floor(Math.random() * items.length)];
  return selected;
}

// https://www.raymondcamden.com/2020/10/26/selecting-random-posts-in-eleventy
