//removes brackets & links

export default function removeBrackets(str) {
  return str.replace(/[\[\]']+/g, "").replace(/\(.*?\)/g, "");
}
