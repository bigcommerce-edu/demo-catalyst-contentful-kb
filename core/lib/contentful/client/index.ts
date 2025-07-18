import { cacheExchange, Client, fetchExchange } from '@urql/core';
import { revalidate } from "~/client/revalidate-target";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

export const contentfulClient = new Client({
  url: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID ?? ''}`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN ?? ''}`,
    },
    next: { revalidate }
  }),
  requestPolicy: 'cache-and-network',
});
