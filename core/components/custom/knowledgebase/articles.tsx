import { KbArticlesItemFragment } from "~/app/api/kb/[locale]/list/route-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface KbArticlesProps {
  articles: Array<FragmentOf<typeof KbArticlesItemFragment>>;
}

export function KbArticles({
  articles
}: KbArticlesProps) {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.sys.id}>
          <div>ID: {article.sys.id}</div>
          <div>Title: {article.title}</div>
          <div className="prose">
            {documentToReactComponents(article.abstract?.json as Document)}
          </div>
        </li>
      ))}
    </ul>
  );
}