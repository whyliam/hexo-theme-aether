const config = require("@next-theme/eslint-config");

module.exports = [...config, { ignores: ['source/js/vendor/**'] }, {
  files: ['source/js/third-party/comments/waline.js'],
  languageOptions: { ecmaVersion: 2021 }
}];
