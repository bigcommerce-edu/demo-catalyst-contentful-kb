import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const contentfulLocale = normalizeLocale(locale);
  const articleShort = await fetchKbArticleShort({ slug, locale: contentfulLocale });

  if (!articleShort) {
    return {};
  }

  return {
    title: articleShort.title,
  };
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
            <header className="mx-auto w-full max-w-4xl pb-8 @2xl:pb-12 @4xl:pb-16">
              <h1 className="mb-4 mt-8 font-heading text-4xl font-medium leading-none @xl:text-5xl @4xl:text-6xl">
                {articleShort.title}
              </h1>
            </header>
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
