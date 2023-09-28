const { regexParser } = require('./utils/regexParser');
const { get } = require('lodash');

function formatMessageWithValues(message, variables, transform) {
  return message.replace(/\{\{([^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+)\}\}/g,(match, values) => {
    const str = get(variables,values,match)
    if(transform) return get(transform,values,(text) => text)(str)
    return str
  });
}

function formatTextValues(message, { match, variables = {}, transform, defaultValue }) {
  const regxp = match
    ? regexParser(match)
    : new RegExp(/\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/, 'g');

  return message.replace(regxp,(matched, values) => {
    let group = values;
    if(match){
      matched = matched.replace(/[!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~]+/g, '');
      group = matched;
    }
    const deflt = typeof defaultValue == 'string' ? defaultValue : get(defaultValue, group,match ? matched : "")
    const str = get(variables,group,deflt)
    return transform ? get(transform,group,(text) => text)(str) : str;
  });
}

module.exports = {
  formatMessageWithValues,
  formatTextValues,
};
