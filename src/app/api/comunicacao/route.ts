import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inviteCode, message, category, name, email } = body;

    if (!inviteCode) {
      return NextResponse.json({ error: 'Código da escola é obrigatório' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    // Validate inviteCode against organizations collection
    const organizationsRef = collection(db, 'organizations');
    const q = query(organizationsRef, where('inviteCode', '==', inviteCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Código da escola inválido.' }, { status: 404 });
    }

    const orgDoc = querySnapshot.docs[0];
    const orgId = orgDoc.id;

    const communicationData: Record<string, any> = {
      message,
      category,
      isAnonymous: category === 'anonymous',
      createdAt: serverTimestamp(),
      recipientRole: "director", // Default recipient for now
      status: "pending",
    };

    if (category === 'identified') {
      communicationData.name = name;
      communicationData.email = email;
      // In a real app, you might also link to a user UID if they are logged in
    }

    const communicationsCollectionRef = collection(db, `organizations/${orgId}/communications`);
    await addDoc(communicationsCollectionRef, communicationData);

    return NextResponse.json({ message: 'Comunicado enviado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar comunicado:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar comunicado.' }, { status: 500 });
  }
}
