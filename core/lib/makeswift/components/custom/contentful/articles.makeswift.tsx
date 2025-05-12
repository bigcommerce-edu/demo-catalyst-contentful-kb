import { runtime } from '~/lib/makeswift/runtime';
import { KbArticles } from '~/components/custom/knowledgebase/articles';
import { List, Combobox, Group, TextInput } from '@makeswift/runtime/controls';
import { z } from 'zod';
import useSWR from 'swr';
import { FetchKbArticlesResponse } from '~/app/api/kb/[locale]/list/route';
import { useLocale } from 'next-intl';

const SearchArticlesResponse = z.object({
  status: z.string(),
  results: z.array(z.object({
    sys: z.object({
      id: z.string(),
    }),
    title: z.string(),
  })).nullable(),
});

interface MSArticlesProps {
  articles: Array<{
    id?: string;
  }>;
}

const search = async (query: string) => {
  const response = await fetch(`/api/kb/search?query=${query}`)
    .then(res => res.json())
    .then(SearchArticlesResponse.parse);

  return response.results;
};

runtime.registerComponent(
  ({
    articles
  }: MSArticlesProps) => {
    const locale = useLocale();

    const ids = articles.map(article => article.id);
    const idsParam = ids.join(',');

    const { data } = useSWR<FetchKbArticlesResponse>(
      ids.length > 0 ? `/api/kb/${locale}/list/?ids=${idsParam}` : null,
      async (url: string) => {
        return fetch(url)
          .then(res => res.json());
      },
    );

    const fetchedArticles = (data?.results ?? []).filter(article => article !== null);

    return (
      <KbArticles articles={fetchedArticles} />
    );
  },
  {
    type: 'kb-articles',
    label: 'Knowledge Base / Articles',
    props: {
      articles: List({
        label: 'Articles',
        type: Group({
          label: 'Article',
          props: {
            title: TextInput({ label: 'Title', defaultValue: 'Article' }),
            id: Combobox({
              label: 'Article',
              async getOptions(query) {
                const articles = await search(query);

                return !articles ? [] : articles.map(article => {
                  if (!article) return null;

                  return {
                    id: article.sys.id,
                    label: article.title ?? '',
                    value: article.sys.id,
                  };
                }).filter(article => article !== null);
              },
            }),
          },
        }),
        getItemLabel(article) {
          return article?.title ?? 'Article';
        }
      }),
    },
  }
);
