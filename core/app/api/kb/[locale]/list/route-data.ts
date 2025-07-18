import { contentfulClient } from "~/lib/contentful/client";
import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { cache } from "react";

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
    const { data } = await contentfulClient.query(KbArticlesQuery, variables);

    return data?.kbArticleCollection?.items;
  },
);
