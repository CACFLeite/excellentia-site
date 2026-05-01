// src/app/pgr/formulario/page.tsx
"use client";

import React, { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlockA from './components/BlockA';
import BlockB from './components/BlockB';
import BlockC from './components/BlockC';
import BlockD from './components/BlockD';
import BlockE from './components/BlockE';
import BlockF from './components/BlockF';

const totalSteps = 6; // A, B, C, D, E, F

function PGRFormPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const organizationId = useMemo(() => searchParams.get('organizationId') || searchParams.get('orgId') || '', [searchParams]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFormDataChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (!organizationId) {
        setMessage({ type: 'error', text: 'Abra o formulário pelo painel da escola para vincular o PGR à organização correta.' });
        return;
      }

      const accidentDescription = String(formData.E02_descricao || '').toLowerCase();
      const occupationalIllnessTerms = ['doença ocupacional', 'doenca ocupacional', 'burnout', 'depressão', 'depressao', 'ler', 'dort', 'disfonia'];
      const accidentTerms = ['queda', 'corte', 'queimadura', 'batida', 'escorreg', 'trajeto', 'choque', 'fratura', 'acidente'];
      if (
        formData.E01 === 'sim' &&
        occupationalIllnessTerms.some((term) => accidentDescription.includes(term)) &&
        !accidentTerms.some((term) => accidentDescription.includes(term))
      ) {
        setMessage({ type: 'error', text: 'No bloco E, doença ocupacional/afastamento deve ser informado em E04/E05, não como acidente de trabalho em E02. Ajuste o preenchimento antes de gerar o PGR.' });
        setCurrentStep(5);
        return;
      }

      const response = await fetch('/api/pgr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, organizationId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `${data.message} Inventário preliminar com ${data.riskCount ?? 0} risco(s) identificado(s).` });
        router.push(`/admin/escolas/${organizationId}/painel`);
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro desconhecido ao gerar PGR.' });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage({ type: 'error', text: 'Falha na conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BlockA formData={formData} onFormDataChange={handleFormDataChange} />;
      // Add other cases for BlockB, BlockC, etc. as they are created
      case 2:
        return <BlockB formData={formData} onFormDataChange={handleFormDataChange} />;
      case 3:
        return <BlockC formData={formData} onFormDataChange={handleFormDataChange} />;
      case 4:
        return <BlockD formData={formData} onFormDataChange={handleFormDataChange} />;
      case 5:
        return <BlockE formData={formData} onFormDataChange={handleFormDataChange} />;
      case 6:
        return <BlockF formData={formData} onFormDataChange={handleFormDataChange} />;
      default:
        return <div className="text-center py-10 text-gray-500">Passo desconhecido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-navy mb-4">Formulário PGR - Programa de Gerenciamento de Riscos</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Estruturado para coletar os dados mínimos do GRO/NR-1: caracterização, perigos, controles, histórico, responsável, inventário de riscos e plano de ação preliminar.
        </p>
        {!organizationId && (
          <div className="py-3 px-6 rounded-md mb-6 text-center bg-yellow-50 text-yellow-900 border border-yellow-200">
            Este formulário precisa ser aberto pelo painel de uma escola para salvar o PGR corretamente.
          </div>
        )}
        
        {message && (
          <div className={`py-3 px-6 rounded-md mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Passo {currentStep} de {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% completo</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gold h-2 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
              >
                Anterior
              </button>
            )}

            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                className={`inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold ${currentStep === 1 ? 'ml-auto' : ''}`}
              >
                Próximo
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Gerando PGR...' : 'Gerar PGR'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PGRFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 text-center text-gray-600">Carregando formulário PGR...</div>}>
      <PGRFormPageContent />
    </Suspense>
  );
}
