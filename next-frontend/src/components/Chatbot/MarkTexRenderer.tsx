import { Remarkable } from "remarkable";
import remarkableKatex from "remarkable-katex";
import "katex/dist/katex.min.css";

const md = new Remarkable();
md.use(remarkableKatex);

export default function MarkdownRenderer({ content }: { content: string }) {
  const renderedHTML = md.render(content);

  return (
    <div
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-left"
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
}
