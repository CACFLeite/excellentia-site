import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, orgId } = body;

    if (!orgId) {
      return NextResponse.json({ error: 'ID da organização é obrigatório' }, { status: 400 });
    }

    if (!formData) {
      return NextResponse.json({ error: 'Dados do formulário são obrigatórios' }, { status: 400 });
    }

    const pgrCollectionRef = collection(db, `organizations/${orgId}/pgr`);
    await addDoc(pgrCollectionRef, {
      status: "draft",
      formData: formData,
      createdAt: serverTimestamp(),
      // generatedDocument: "", // Will be added later
      // signatureId: "", // Will be added later
      // signedAt: null,
      // signedBy: "",
    });

    return NextResponse.json({ message: 'PGR gerado com sucesso — aguarde o documento' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar PGR no Firestore:', error);
    return NextResponse.json({ error: 'Erro interno ao gerar PGR' }, { status: 500 });
  }
}
