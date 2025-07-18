import { contentfulClient } from "~/lib/contentful/client";
import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { cache } from "react";

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
