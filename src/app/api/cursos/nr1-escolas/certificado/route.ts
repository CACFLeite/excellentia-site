import { NextRequest } from 'next/server';
import { POST as postCourseCertificate } from '../../[courseSlug]/certificado/route';

export function POST(request: NextRequest) {
  return postCourseCertificate(request, { params: Promise.resolve({ courseSlug: 'nr1-escolas' }) });
}
