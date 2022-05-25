  // Für die sitemap.xml
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  const { DateTime } = require("luxon");

  const htmlDateString = function(dateObj) {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  }
  module.exports = {htmlDateString};
