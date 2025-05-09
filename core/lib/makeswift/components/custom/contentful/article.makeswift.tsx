import { runtime } from '~/lib/makeswift/runtime';
import { Article } from '~/components/custom/knowledgebase/article';
import { Combobox } from '@makeswift/runtime/controls';
import { z } from 'zod';
import useSWR from 'swr';
import { KbArticleFragment } from '~/app/api/kb/[locale]/article/[id]/route-data';
import { FragmentOf } from 'gql.tada';

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
  const response = await fetch(`/api/kb/en-US/search?query=${query}`)
    .then(res => res.json())
    .then(SearchArticlesResponse.parse);

  return response.results;
};

runtime.registerComponent(
  ({
    id
  }: MSArticleProps) => {
    const { data, isLoading } = useSWR(
      id ? `/api/kb/en-US/article/${id}` : null,
      async (url: string) => {
        return fetch(url)
          .then(res => res.json());
      },
    );

    if (isLoading) {
      return (
        <div>No article</div>
      );
    }

    const article = data.result as FragmentOf<typeof KbArticleFragment>;

    return (
      <Article article={article} />
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
            return {
              id: article.sys.id,
              label: article.title,
              value: article.sys.id,
            };
          });
        },
      })
    },
  }
);
