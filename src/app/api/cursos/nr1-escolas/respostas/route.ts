import { NextRequest } from 'next/server';
import { POST as postCourseResponse } from '../../[courseSlug]/respostas/route';

export function POST(request: NextRequest) {
  return postCourseResponse(request, { params: Promise.resolve({ courseSlug: 'nr1-escolas' }) });
}
