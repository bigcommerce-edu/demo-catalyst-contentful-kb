import { KbAbstractFragment } from "~/app/api/kb/[locale]/article/[id]/route-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import Image from "next/image";

interface KbArticleProps {
  article?: FragmentOf<typeof KbAbstractFragment> | null;
}

export function KbArticleAbstract({
  article
}: KbArticleProps) {
  if (!article) return <div>No article</div>;

  return (
    <section className="w-full">
      <h2 className="font-heading text-xl text-[hsl(var(--contrast-500))] text-center">
        {article.title}
      </h2>
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
          {documentToReactComponents(article.abstract?.json as Document)}
        </div>
      </div>
    </section>
  );
}