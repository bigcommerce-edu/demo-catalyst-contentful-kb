import { KbArticleFragment } from "~/app/[locale]/(default)/kb/[slug]/page-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import Image from "next/image";

interface KbArticleProps {
  article?: FragmentOf<typeof KbArticleFragment> | null;
}

export function KbArticle({
  article
}: KbArticleProps) {
  if (!article) return <div>No article</div>;

  return (
    <section className="w-full">
      <h1 className="font-heading text-xl text-[hsl(var(--contrast-500))] text-center">
        {article.title}
      </h1>
      <div className="mx-auto prose border border-x-2 border-y-0 border-[hsl(var(--primary))] p-4">
        {article.bannerImage?.url && (
          <Image
            className="mx-auto"
            src={article.bannerImage.url}
            alt={article.bannerImage.title ?? ''}
            width={200} height={200}
          />
        )}
        <div>
          {documentToReactComponents(article.body?.json as Document)}
        </div>
      </div>
    </section>
  );
}