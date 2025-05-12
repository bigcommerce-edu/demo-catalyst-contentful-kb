import { runtime } from '~/lib/makeswift/runtime';
import { KbArticle } from '~/components/custom/knowledgebase/article';
import { Combobox } from '@makeswift/runtime/controls';
import { z } from 'zod';
import useSWR from 'swr';
import { FetchKbArticleResponse } from '~/app/api/kb/[locale]/article/[id]/route';
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

interface MSArticleProps {
  id?: string;
}

const search = async (query: string) => {
  const response = await fetch(`/api/kb/search?query=${query}`)
    .then(res => res.json())
    .then(SearchArticlesResponse.parse);

  return response.results;
};

runtime.registerComponent(
  ({
    id
  }: MSArticleProps) => {
    const locale = useLocale();

    const { data } = useSWR<FetchKbArticleResponse>(
      id ? `/api/kb/${locale}/article/${id}` : null,
      async (url: string) => {
        return fetch(url)
          .then(res => res.json());
      },
    );

    const article = data?.result;

    return (
      <KbArticle article={article} />
    );
  },
  {
    type: 'kb-article',
    label: 'Knowledge Base / Article',
    props: {
      id: Combobox({
        label: 'Article',
        async getOptions(query: string) {
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
      })
    },
  }
);
