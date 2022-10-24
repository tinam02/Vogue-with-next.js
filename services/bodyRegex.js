//formatiranje body texta jer im ne radi enhancedlinks false
//removes |...| then [...}, [...], (...) and +++...
const formatBody = (text) => {
  const regex = /(\|.*?\|)|(\{.*?\})|(\[.*?\])|(\(.*?\))|^\+.*$/gm;
  const newText = text.replace(regex, "");
  return newText;
};

export default formatBody;
