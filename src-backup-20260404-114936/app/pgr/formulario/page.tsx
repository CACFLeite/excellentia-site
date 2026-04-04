// src/app/pgr/formulario/page.tsx
"use client";

import React, { useState } from 'react';
import BlockA from './components/BlockA';
// Import other blocks as they are created

const totalSteps = 6; // A, B, C, D, E, F

export default function PGRFormPage() {
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
      // For now, use a dummy orgId. In a real app, this would come from user session.
      const orgId = "excellentia_dummy_org_id"; 
      
      const response = await fetch('/api/pgr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, orgId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        // Optionally reset form or redirect
        setFormData({});
        setCurrentStep(1);
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
        return <div className="text-center py-10 text-gray-500">Bloco B (em construção)</div>;
      case 3:
        return <div className="text-center py-10 text-gray-500">Bloco C (em construção)</div>;
      case 4:
        return <div className="text-center py-10 text-gray-500">Bloco D (em construção)</div>;
      case 5:
        return <div className="text-center py-10 text-gray-500">Bloco E (em construção)</div>;
      case 6:
        return <div className="text-center py-10 text-gray-500">Bloco F (em construção)</div>;
      default:
        return <div className="text-center py-10 text-gray-500">Passo desconhecido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-navy mb-8">Formulário PGR - Programa de Gerenciamento de Riscos</h1>
        
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
