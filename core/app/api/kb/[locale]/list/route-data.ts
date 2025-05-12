import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { contentfulFetch } from "~/lib/contentful/client";
import { cache } from "react";
import { revalidate } from "~/client/revalidate-target";

export const KbArticlesItemFragment = contentfulGraphql(`
  fragment KbArticlesItemFragment on KbArticle {
    sys {
        id
    }
    title
    slug
    publishDate
    bannerImage {
        title
        url
    }
    abstract {
        json
    }
    body {
        json
    }
    source
    tags
  }
`);

const KbArticlesQuery = contentfulGraphql(`
  query FetchKbArticles(
    $ids: [String],
    $locale: String
  ){
    kbArticleCollection(
        where: {
            sys: {
              id_in: $ids
            }
        },
        locale: $locale,
        order: [title_ASC]
    ) {
        items {
          ...KbArticlesItemFragment
        }
    }
  }
`, [KbArticlesItemFragment]);

type Variables = VariablesOf<typeof KbArticlesQuery>;

export const fetchKbArticles = cache(
  async (variables: Variables) => {
    const { data } = await contentfulFetch({
      document: KbArticlesQuery,
      variables,
      fetchOptions: { next: { revalidate } },
    });

    return data.kbArticleCollection?.items;
  },
);
