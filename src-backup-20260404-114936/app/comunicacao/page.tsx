// src/app/comunicacao/page.tsx
"use client";

import React, { useState } from 'react';
import TextInput from '../pgr/formulario/components/TextInput'; // Reusing component
import RadioGroup from '../pgr/formulario/components/RadioGroup'; // Reusing component

export default function ComunicacaoPage() {
  const [formData, setFormData] = useState({
    inviteCode: '',
    message: '',
    category: 'anonymous', // Default to anonymous
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = { ...formData };
      if (payload.category === 'anonymous') {
        delete payload.name;
        delete payload.email;
      }

      const response = await fetch('/api/comunicacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ inviteCode: '', message: '', category: 'anonymous', name: '', email: '' }); // Reset form
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro desconhecido ao enviar comunicado.' });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage({ type: 'error', text: 'Falha na conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'anonymous', label: 'Anônimo' },
    { value: 'identified', label: 'Identificado' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-navy mb-8">Canal de Comunicação Excellentia</h1>
        <p className="text-center text-gray-600 mb-8">Envie suas sugestões, dúvidas ou feedback para a direção da escola.</p>
        
        {message && (
          <div className={`py-3 px-6 rounded-md mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            id="inviteCode"
            label="Código da Escola"
            value={formData.inviteCode}
            onChange={(value) => handleInputChange('inviteCode', value)}
            placeholder="Ex: ESCOLA-ABC-2026"
            required
          />
          <TextInput
            id="message"
            label="Mensagem"
            value={formData.message}
            onChange={(value) => handleInputChange('message', value)}
            placeholder="Sua mensagem..."
            required
            type="textarea" // Not a standard TextInput type, but good for placeholder
          />
          <RadioGroup
            id="category"
            label="Categoria"
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            options={categoryOptions}
            required
          />

          {formData.category === 'identified' && (
            <>
              <TextInput
                id="name"
                label="Seu Nome"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                required
              />
              <TextInput
                id="email"
                label="Seu E-mail"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                type="email"
                required
              />
            </>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Comunicado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
