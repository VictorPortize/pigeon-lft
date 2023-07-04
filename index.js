const { regexParser } = require('./utils/regexParser');
const _ = require('lodash')

function formatMessageWithValues(message, variables, transform) {
  return message.replace(/\{\{([^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+)\}\}/g,(match, values) => {
    const str = _.get(variables,values,match)
    if(transform) return _.get(transform,values,(text) => text)(str)
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
    const deflt = typeof defaultValue == 'string' ? defaultValue : _.get(defaultValue, group,match ? matched : "") 
    const str = _.get(variables,group,deflt)
    return transform ? _.get(transform,group,(text) => text)(str) : str; 
  });
}

module.exports = {
  formatMessageWithValues,
  formatTextValues,
};
