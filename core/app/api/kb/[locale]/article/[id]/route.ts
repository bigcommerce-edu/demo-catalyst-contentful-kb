import { NextRequest, NextResponse } from 'next/server';
import { fetchKbArticle } from './route-data';

type Params = {
  id: string;
  locale: string;
};

export const GET = async (
  request: NextRequest, 
  { params }: { params: Promise<Params> }
) => {
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
