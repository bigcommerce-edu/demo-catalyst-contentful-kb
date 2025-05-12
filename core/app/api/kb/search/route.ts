import { NextRequest, NextResponse } from 'next/server';
import { searchKbArticles } from './route-data';

export interface SearchKbArticlesResponse {
  status: string;
  results: Awaited<ReturnType<typeof searchKbArticles>>;
}

const limit = 10;

export const GET = async (
  request: NextRequest
): Promise<NextResponse<SearchKbArticlesResponse>> => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  const articles = await searchKbArticles({
    search: query,
    limit,
  });

  return NextResponse.json({
    status: 'success',
    results: articles,
  });
};
