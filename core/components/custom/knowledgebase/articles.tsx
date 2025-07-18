import { clsx } from 'clsx';

import { KbArticlesItemFragment } from "~/app/api/kb/[locale]/list/route-data";
import { FragmentOf } from "gql.tada";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { Card } from '@/vibes/soul/primitives/card';

interface KbArticlesProps {
  articles: Array<FragmentOf<typeof KbArticlesItemFragment>>;
}

export function KbArticles({
  articles
}: KbArticlesProps) {
  return (
    <div className={clsx('w-full @container')}>
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-6 @sm:grid-cols-2 @2xl:grid-cols-3 @2xl:gap-x-5 @2xl:gap-y-8 @5xl:grid-cols-4 @7xl:grid-cols-5">
      {articles.map(article => (
        <Card
          key={article.sys.id}
          title={article.title ?? ''}
          href=""
        />
      ))}
      </div>
    </div>
  );
}