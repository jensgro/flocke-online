// inspired by https://github.com/joshcanhelp/josh-to-11/blob/master/eleventy/collections.js

const alphaSortTitle = (a, b) => {
  if (a.data.title < b.data.title) return -1;
  if (b.data.title > a.data.title) return 1;
  return 0;
};

const maincourseCollection = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "hauptgerichte" === post.data.category)
    .sort(alphaSortTitle);
};

const maincourseRandom = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "hauptgerichte" === post.data.category)
    .sort(() => {
      return 0.5 - Math.random();
    });
};

const sidedishCollection = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "beilagen" === post.data.category)
    .sort(alphaSortTitle);
};

const sidedishRandom = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "beilagen" === post.data.category)
    .sort(() => {
      return 0.5 - Math.random();
    });
};

const otherCollection = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "sonstiges" === post.data.category)
    .sort(alphaSortTitle);
};

const otherRandom = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "sonstiges" === post.data.category)
    .sort(() => {
      return 0.5 - Math.random();
    });
};

const knowledgeCollection = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "wissenswertes" === post.data.category)
    .sort(alphaSortTitle);
};

const knowledgeRandom = (collection) => {
  return collection
    .getAllSorted()
    .filter((post) => "wissenswertes" === post.data.category)
    .sort(() => {
      return 0.5 - Math.random();
    });
};

const allTags = (collections) => {
  let allTags = [];

  collections.getAllSorted().forEach((el) => {
    allTags = allTags.concat(el.data.tags);
  });

  const tagsWithCount = {};
  allTags.sort().forEach((tag) => {
    if (tag) {
      tagsWithCount[tag] = tagsWithCount[tag] ? tagsWithCount[tag] + 1 : 1;
    }
    return tag;
  })

  allTags.sort((a, b) => {
    return tagsWithCount[a] > tagsWithCount[b] ? -1 : tagsWithCount[a] > tagsWithCount[b] ? -1 : 0;
  });

  [... new Set(allTags)].forEach(tag => {
    if (tag) {
      const count = tagsWithCount[tag];
      delete tagsWithCount[tag];
      tagsWithCount[tag] = count;
    }
  });

  return tagsWithCount;
};

module.exports = {
  allTags,
  maincourseCollection,
  maincourseRandom,
  sidedishCollection,
  sidedishRandom,
  otherCollection,
  otherRandom,
  knowledgeCollection,
  knowledgeRandom
}
