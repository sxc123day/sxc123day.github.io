import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import "highlight.js/lib/highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function (md: any) {
  const converter = new showdown.Converter({
    extensions: [showdownHighlight]
  });
  const text = md.toString();
  const html = converter.makeHtml(text);
  return html;
}