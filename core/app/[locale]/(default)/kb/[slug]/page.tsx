import { setRequestLocale } from 'next-intl/server';

import { fetchKbArticleShort, fetchKbArticle } from './page-data';
import normalizeLocale from '~/lib/contentful/normalizeLocale';
import { Stream } from '@/vibes/soul/lib/streamable';
import { KbArticle } from '~/components/custom/knowledgebase/article';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function KbPage(props: Props) {
  const { locale, slug } = await props.params;

  setRequestLocale(locale);

  const contentfulLocale = normalizeLocale(locale);
  const articleShort = await fetchKbArticleShort({ slug, locale: contentfulLocale });

  if (!articleShort) {
    return (
      <div>Not found</div>
    );
  }

  const articlePromise = fetchKbArticle({ id: articleShort.sys.id, locale: contentfulLocale });

  return (
    <section className="@container">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 @xl:px-6 @xl:py-14 @4xl:px-8 @4xl:py-20">
        <Stream value={articlePromise}
          fallback={(
            <h1>{articleShort.title}</h1>
          )}
        >
          {(article) => (
            <KbArticle article={article} />
          )}
        </Stream>
      </div>
    </section>
  );
}
