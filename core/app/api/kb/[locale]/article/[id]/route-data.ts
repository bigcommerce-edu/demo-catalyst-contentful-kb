import { contentfulGraphql, VariablesOf } from "~/lib/contentful/client/graphql";
import { contentfulFetch } from "~/lib/contentful/client";
import { cache } from "react";
import { revalidate } from "~/client/revalidate-target";

const KbArticleQuery = contentfulGraphql(`
  query FetchKbArticle(
    $id: String!,
    $locale: String
  ){
    kbArticle(
        id: $id,
        locale: $locale
    ) {
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
  }
`);

type Variables = VariablesOf<typeof KbArticleQuery>;

export const fetchKbArticle = cache(
  async (variables: Variables) => {
    const { data } = await contentfulFetch({
      document: KbArticleQuery,
      variables,
      fetchOptions: { next: { revalidate } },
    });

    return data.kbArticle;
  },
);
