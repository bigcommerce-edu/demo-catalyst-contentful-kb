import { KbArticleFragment } from "~/app/api/kb/[locale]/article/[id]/route-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface ArticleProps {
  article: FragmentOf<typeof KbArticleFragment>;
}

export function Article({
  article
}: ArticleProps) {
  return (
    <div>
      <div>ID: {article.sys.id}</div>
      <div>Title: {article.title}</div>
      <div className="prose">
        {documentToReactComponents(article.body?.json as Document)}
      </div>
    </div>
  );
}