import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { contentfulFetch } from "~/lib/contentful/client";
import { cache } from "react";
import { revalidate } from "~/client/revalidate-target";

const SearchKbArticlesQuery = contentfulGraphql(`
  query SearchKbArticles(
    $search: String,
    $locale: String,
    $limit: Int
  ){
    kbArticleCollection(
        where: {
            title_contains: $search
        },
        locale: $locale,
        order: [title_ASC],
        limit: $limit
    ) {
        items {
            sys {
                id
            }
            title
        }
    }
  }
`);

type Variables = VariablesOf<typeof SearchKbArticlesQuery>;

export const searchKbArticles = cache(
  async (variables: Variables) => {
    const { data } = await contentfulFetch({
      document: SearchKbArticlesQuery,
      variables,
      fetchOptions: { next: { revalidate } },
    });

    return data.kbArticleCollection?.items ?? [];
  },
);
