import { contentfulClient } from "~/lib/contentful/client";
import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { cache } from "react";

const SearchKbArticlesQuery = contentfulGraphql(`
  query SearchKbArticles(
    $search: String,
    $limit: Int
  ){
    kbArticleCollection(
        where: {
            title_contains: $search
        },
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
    const { data } = await contentfulClient.query(SearchKbArticlesQuery, variables);

    return data?.kbArticleCollection?.items ?? [];
  },
);
