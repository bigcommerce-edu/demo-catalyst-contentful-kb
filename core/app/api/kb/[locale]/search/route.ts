import { NextRequest, NextResponse } from 'next/server';
import { searchKbArticles } from './route-data';

type Params = {
  locale: string;
};

const limit = 10;

export const GET = async (
  request: NextRequest, 
  { params }: { params: Promise<Params> }
) => {
  const { locale } = await params;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  const articles = await searchKbArticles({
    search: query,
    locale,
    limit,
  });

  return NextResponse.json({
    status: 'success',
    results: articles,
  });
};
