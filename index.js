const { regexParser } = require('./utils/regexParser');

function formatMessageWithValues(message, variables, transforms) {
  const regex = new RegExp(
    /{{[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+}}/,
    'g'
  );
  const substitutionVarMatch = regex.exec(message);
  if (!substitutionVarMatch) return message;
  const variableFormats = {};
  substitutionVarMatch?.forEach((item) => {
    variableFormats[item] = item.replace(/[{}]+/g, '');
  });
  let msg = message;
  substitutionVarMatch.forEach((format) => {
    const frm = variableFormats[format];
    let to = variables[frm];

    if (transforms && transforms[frm]) {
      to = transforms[frm](to);
    }
    msg = msg.replaceAll(format, to);
  });
  return msg;
}

function formatTextValues(message, { match, variables, transforms }) {
  const regxp = match
    ? regexParser(match)
    : new RegExp(/{{[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+}}/, 'g');
  const substitutionVarMatch = message.match(regxp);
  if (!substitutionVarMatch) return message;
  const variableFormats = {};
  substitutionVarMatch?.forEach((item) => {
    variableFormats[item] = item.replace(/[{}]+/g, '');
  });
  let msg = message;
  substitutionVarMatch.forEach((format) => {
    const frm = variableFormats[format];
    let to = variables[frm] ?? '';

    if (transforms && transforms[frm]) {
      to = transforms[frm](to);
    }
    msg = msg.replaceAll(format, to);
  });
  return msg;
}

module.exports = {
  formatMessageWithValues,
  formatTextValues,
};
