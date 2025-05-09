import { runtime } from '~/lib/makeswift/runtime';
import { Article } from '~/components/custom/knowledgebase/article';
import { Combobox } from '@makeswift/runtime/controls';
import { z } from 'zod';

const SearchArticlesResponse = z.object({
  status: z.string(),
  results: z.array(z.object({
    sys: z.object({
      id: z.string(),
    }),
    title: z.string(),
  })).nullable(),
});

const search = async (query: string) => {
  const response = await fetch(`/api/kb/en-US/search?query=${query}`)
    .then(res => res.json())
    .then(SearchArticlesResponse.parse);

  return response.results;
};

runtime.registerComponent(
  Article,
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
