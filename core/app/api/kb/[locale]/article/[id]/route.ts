import { NextRequest, NextResponse } from 'next/server';
import { fetchKbArticleAbstract } from './route-data';
import normalizeLocale from '~/lib/contentful/normalizeLocale';

type Params = {
  id: string;
  locale: string;
};

export interface FetchKbArticleAbstractResponse {
  status: string;
  result: Awaited<ReturnType<typeof fetchKbArticleAbstract>>;
}

export const GET = async (
  request: NextRequest, 
  { params }: { params: Promise<Params> }
): Promise<NextResponse<FetchKbArticleAbstractResponse>> => {
  const { id, locale } = await params;

  const article = await fetchKbArticleAbstract({
    id,
    locale: normalizeLocale(locale),
  });

  return NextResponse.json({
    status: 'success',
    result: article,
  });
};
