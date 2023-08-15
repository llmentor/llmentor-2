import { NextResponse } from 'next/server';
import { runPipeline } from '@/lib/pipelines/runners';

export async function POST(req: Request) {
  const { pipeline } = await req.json();

  const response = await runPipeline(pipeline);

  return NextResponse.json(response);
}
