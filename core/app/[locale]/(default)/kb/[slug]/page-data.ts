import { contentfulClient } from "~/lib/contentful/client";
import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { cache } from "react";

export const KbArticleShortFragment = contentfulGraphql(`
  fragment ArticleFragment on KbArticle {
      sys {
        id
      }
      title
      abstract {
        json
      }
  }
`);

const KbArticleShortQuery = contentfulGraphql(`
  query FetchKbArticle(
    $slug: String!,
    $locale: String
  ){
    kbArticleCollection(
      where: {
        slug: $slug
      },
      locale: $locale
    ) {
        items {
          ...ArticleFragment
        }
    }
  }
`, [KbArticleShortFragment]);

type ShortVariables = VariablesOf<typeof KbArticleShortQuery>;

export const fetchKbArticleShort = cache(
  async (variables: ShortVariables) => {
    console.log(variables);

    const { data } = await contentfulClient.query(KbArticleShortQuery, variables);

    console.log(data);

    return data?.kbArticleCollection?.items[0] ?? null;
  },
);

export const KbArticleFragment = contentfulGraphql(`
  fragment ArticleFragment on KbArticle {
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
      body {
        json
      }
      source
      tags
  }
`);

const KbArticleQuery = contentfulGraphql(`
  query FetchKbArticle(
    $id: String!,
    $locale: String
  ){
    kbArticle(
        id: $id,
        locale: $locale
    ) {
      ...ArticleFragment
    }
  }
`, [KbArticleFragment]);

type Variables = VariablesOf<typeof KbArticleQuery>;

export const fetchKbArticle = cache(
  async (variables: Variables) => {
    const { data } = await contentfulClient.query(KbArticleQuery, variables);

    return data?.kbArticle;
  },
);
