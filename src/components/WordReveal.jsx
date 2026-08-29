export function WordReveal({ as: Tag = "h2", className = "", children, id }) {
  const words = String(children).split(" ");

  return (
    <Tag id={id} className={`word-reveal ${className}`.trim()} aria-label={children}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          {word}
        </span>
      ))}
    </Tag>
  );
}
