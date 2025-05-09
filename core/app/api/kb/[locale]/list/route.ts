import { NextRequest, NextResponse } from 'next/server';
import { fetchKbArticles } from './route-data';

type Params = {
  locale: string;
};

export const GET = async (
  request: NextRequest, 
  { params }: { params: Promise<Params> }
) => {
  const { locale } = await params;
  const searchParams = request.nextUrl.searchParams;
  const idsParam = searchParams.get('ids');

  const ids = idsParam?.split(',');

  const articles = await fetchKbArticles({
    ids,
    locale,
  });

  return NextResponse.json({
    status: 'success',
    results: articles,
  });
};
