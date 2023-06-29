function isValidRegex(text) {
  return new RegExp(/(\/\S+\/)/).test(text);
}

module.exports = {
  isValidRegex,
};
