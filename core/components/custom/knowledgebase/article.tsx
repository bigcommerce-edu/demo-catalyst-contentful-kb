interface ArticleProps {
  id?: string;
}

export function Article({
  id
}: ArticleProps) {
  return (
    <div>{id ?? 'No id'}</div>
  );
}