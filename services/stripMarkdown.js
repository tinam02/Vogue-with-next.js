export default function stripMarkdown(text) {
  if (!text) return "";
  return text.replace(/\[(.*?)\]\(.*?\)/g, "$1");
}
