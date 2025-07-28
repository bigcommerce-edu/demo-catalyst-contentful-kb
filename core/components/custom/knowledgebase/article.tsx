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
      <header className="mx-auto w-full max-w-4xl pb-8 @2xl:pb-12 @4xl:pb-16">
        <h1 className="mb-4 mt-8 font-heading text-4xl font-medium leading-none @xl:text-5xl @4xl:text-6xl">
          {article.title}
        </h1>
      </header>
      <div className="@-xl:[&_h2]:text-4xl prose mx-auto w-full max-w-4xl space-y-4 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-normal [&_h2]:leading-none [&_img]:mx-auto [&_img]:max-h-[600px] [&_img]:w-fit [&_img]:rounded-2xl [&_img]:object-cover border border-x-2 border-y-0 border-[hsl(var(--primary))] p-4">
        {article.bannerImage?.url && (
          <Image
            className="mx-auto"
            src={article.bannerImage.url}
            alt={article.bannerImage.title ?? ''}
            width={600} height={600}
          />
        )}
        <div>
          {documentToReactComponents(article.body?.json as Document)}
        </div>
      </div>
    </section>
  );
}