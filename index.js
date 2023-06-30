const { regexParser } = require('./utils/regexParser');

function formatMessageWithValues(message, variables, transform) {
  const substitutionVarMatch = message.match(/{{[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+}}/g)
  if (!substitutionVarMatch) return message;
  const variableFormats = {};
  substitutionVarMatch?.forEach((item) => {
    variableFormats[item] = item.replace(/[{}]+/g, '');
  });
  let msg = message;
  substitutionVarMatch.forEach((format) => {
    const frm = variableFormats[format];
    let to = variables[frm];

    if (transform && transform[frm]) {
      to = transform[frm](to);
    }
    msg = msg.replaceAll(format, to);
  });
  return msg;
}

function formatTextValues(message, { match, variables, transform }) {
  const regxp = match
    ? regexParser(match)
    : new RegExp(/{{[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+}}/, 'g');
  const substitutionVarMatch = message.match(regxp);
  if (!substitutionVarMatch) return message;
  const variableFormats = {};
  substitutionVarMatch?.forEach((item) => {
    variableFormats[item] = item.replace(/[!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~]+/g, '');
  });
  let msg = message;
  substitutionVarMatch.forEach((format) => {
    const frm = variableFormats[format];
    let to = variables[frm] ?? '';

    if (transform && transform[frm]) {
      to = transform[frm](to);
    }
    msg = msg.replaceAll(format, to);
  });
  return msg;
}

module.exports = {
  formatMessageWithValues,
  formatTextValues,
};
