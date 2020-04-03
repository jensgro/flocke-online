// https://github.com/larryhudson/personal-site-11ty/blob/master/_11ty/getTagList.js
module.exports = function(collection) {
  let tagSet = new Set();
  let tagCounts = {};
  const tagsToIgnore = ["all","nav","posts","post"]
  collection.getAll().forEach(function(item) {
    if( "tags" in item.data ) {
      item.data.tags
        .filter(tag => !tagsToIgnore.includes(tag))
        .forEach(tag => {
          tagSet.add(tag);
          const currentCount = tagCounts[tag]
          tagCounts[tag] = currentCount ? currentCount + 1 : 1
        });
    }
  });

  return [...tagSet].map(tag => {
    return {
      'tag': tag,
      'count': tagCounts[tag]
    }
  }).sort((a, b) => b['count'] - a['count'])

  // returning an array in addCollection works in Eleventy 0.5.3
};
