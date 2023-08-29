import { NextRequest, NextResponse } from 'next/server';
import { getPipelines } from '@/lib/pipelines/storage';
import { NewPipelineExecution } from '@/lib/new-pipelines/types';
import { saveExecution } from '@/lib/new-pipelines/storage/executions/saveExecution';

export async function POST(req: NextRequest) {
  const { execution }: { execution: NewPipelineExecution } = await req.json();
  const clientExecution = await saveExecution(execution);
  return NextResponse.json({ clientExecution })
}