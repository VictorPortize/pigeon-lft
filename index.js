function formatMessageWithValues(message, variables, transforms) {
  const substitutionVarMatch = message.match(
    /{{[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+}}/g
  );
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

module.exports = {
  formatMessageWithValues,
};
