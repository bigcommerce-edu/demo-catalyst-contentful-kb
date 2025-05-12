import { NextRequest, NextResponse } from 'next/server';
import { fetchKbArticle } from './route-data';

type Params = {
  id: string;
  locale: string;
};

export interface FetchKbArticleResponse {
  status: string;
  result: Awaited<ReturnType<typeof fetchKbArticle>>;
}

export const GET = async (
  request: NextRequest, 
  { params }: { params: Promise<Params> }
): Promise<NextResponse<FetchKbArticleResponse>> => {
  const { id, locale } = await params;

  const article = await fetchKbArticle({
    id,
    locale,
  });

  return NextResponse.json({
    status: 'success',
    result: article,
  });
};
