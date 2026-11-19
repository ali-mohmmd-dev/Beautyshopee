export function DescriptionText({ text }: { text: string }) {
  return (
    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
      {text.split(/\n\s*\n/).map((paragraph, index) =>
        paragraph.startsWith("## ") ? (
          <h3 key={index} className="text-lg font-medium text-foreground">
            {paragraph.slice(3)}
          </h3>
        ) : paragraph.startsWith("- ") ? (
          <ul key={index} className="list-disc space-y-1 pl-5">
            {paragraph.split("\n").map((line, i) => (
              <li key={i}>{line.replace(/^- /, "")}</li>
            ))}
          </ul>
        ) : (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ),
      )}
    </div>
  );
}
