const { isValidRegex } = require('./validator');

function regexParser(regexp) {
  if (!isValidRegex(regexp)) throw new Error('RegExp not valid');
  return new RegExp(regexp);
}

module.exports = {
  regexParser,
};
