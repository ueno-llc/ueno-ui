const sass = require('node-sass');

module.exports = function processSass(data, filename) {
  const result = sass.renderSync({
    data,
    file: filename,
  }).css;
  return result.toString('utf8');
};
