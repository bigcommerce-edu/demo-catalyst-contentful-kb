import { KbArticleFragment } from "~/app/api/kb/[locale]/article/[id]/route-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface KbArticleProps {
  article?: FragmentOf<typeof KbArticleFragment> | null;
}

export function KbArticle({
  article
}: KbArticleProps) {
  if (!article) return <div>No article</div>;

  return (
    <section className="w-full">
      <h2 className="font-heading text-xl text-[hsl(var(--contrast-500))] text-center">
        {article.title}
      </h2>
      <div className="mx-auto prose border border-x-2 border-y-0 border-[hsl(var(--primary))] p-4">
        {documentToReactComponents(article.body?.json as Document)}
      </div>
    </section>
  );
}