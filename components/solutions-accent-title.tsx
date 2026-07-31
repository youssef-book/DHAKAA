type AccentTitleProps = {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
  /** Zero-based index of the word to highlight in blue. */
  accentWordIndex?: number;
};

export function AccentTitle({
  text,
  className,
  as: Tag = "span",
  accentWordIndex,
}: AccentTitleProps) {
  const words = text.trim().split(/\s+/);

  if (
    accentWordIndex === undefined ||
    accentWordIndex < 0 ||
    accentWordIndex >= words.length
  ) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          {index === accentWordIndex ? (
            <span className="font-medium text-blue-700">{word}</span>
          ) : (
            word
          )}
        </span>
      ))}
    </Tag>
  );
}
