import { NextRequest } from 'next/server';
import { GET as getCourse } from '../[courseSlug]/route';

export function GET(request: NextRequest) {
  return getCourse(request, { params: Promise.resolve({ courseSlug: 'nr1-escolas' }) });
}
