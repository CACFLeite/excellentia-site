// src/app/pgr/formulario/components/BlockA.tsx
import React from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';

interface BlockAProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const cnaeOptions = [
  { value: '8511-2/00', label: '8511-2/00 — Educação infantil (creche)' },
  { value: '8512-1/00', label: '8512-1/00 — Educação infantil (pré-escola)' },
  { value: '8513-9/00', label: '8513-9/00 — Ensino fundamental' },
  { value: '8520-1/00', label: '8520-1/00 — Ensino médio' },
  { value: '8531-7/00', label: '8531-7/00 — Educação superior (graduação)' },
  { value: '8541-4/00', label: '8541-4/00 — Educação profissional de nível técnico' },
  { value: '8542-2/00', label: '8542-2/00 — Educação profissional de nível tecnológico' },
  { value: 'outro', label: 'Outro (especificar)' },
];

const yesNoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const BlockA: React.FC<BlockAProps> = ({ formData, onFormDataChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">BLOCO A — Identificação do Estabelecimento</h2>
      <TextInput
        id="A01"
        label="A01 — Qual é a razão social da escola?"
        value={formData.A01 || ''}
        onChange={(value) => onFormDataChange('A01', value)}
        required
      />
      <TextInput
        id="A02"
        label="A02 — Qual é o CNPJ da escola?"
        value={formData.A02 || ''}
        onChange={(value) => onFormDataChange('A02', value)}
        required
      />
      <TextInput
        id="A03"
        label="A03 — Qual é o endereço completo da escola?"
        value={formData.A03 || ''}
        onChange={(value) => onFormDataChange('A03', value)}
        required
      />
      <RadioGroup
        id="A04"
        label="A04 — A escola possui mais de uma unidade/filial?"
        value={formData.A04 || ''}
        onChange={(value) => onFormDataChange('A04', value)}
        options={yesNoOptions}
        required
      />
      {formData.A04 === 'sim' && (
        <TextInput
          id="A04_sub"
          label="Este questionário cobre qual unidade? Liste os endereços das demais unidades."
          value={formData.A04_sub || ''}
          onChange={(value) => onFormDataChange('A04_sub', value)}
          required
        />
      )}
      <TextInput
        id="A05_telefone"
        label="A05 — Qual é o telefone de contato da escola?"
        value={formData.A05_telefone || ''}
        onChange={(value) => onFormDataChange('A05_telefone', value)}
        placeholder="Ex: (11) 3333-4444 ou (11) 99999-9999"
        mask="phone"
        inputMode="tel"
        maxLength={15}
        pattern="^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$"
        helperText="Use o padrão (DDD) número fixo ou móvel."
        required
      />
      <TextInput
        id="A05_email"
        label="A05 — Qual é o e-mail de contato da escola?"
        value={formData.A05_email || ''}
        onChange={(value) => onFormDataChange('A05_email', value)}
        type="email"
        placeholder="Ex: contato@escola.com.br"
        required
      />
      <SelectInput
        id="A06"
        label="A06 — Qual é o CNAE principal da escola?"
        value={formData.A06 || ''}
        onChange={(value) => onFormDataChange('A06', value)}
        options={cnaeOptions}
        required
      />
      {formData.A06 === 'outro' && (
        <TextInput
          id="A06_outro"
          label="Especificar outro CNAE"
          value={formData.A06_outro || ''}
          onChange={(value) => onFormDataChange('A06_outro', value)}
          required
        />
      )}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
        O grau de risco será estimado pelo sistema a partir do CNAE, das atividades, ambientes e respostas do formulário. Se houver laudo técnico ou enquadramento oficial divergente, ele deve prevalecer na validação final.
      </div>
      <TextInput
        id="A08"
        label="A08 — Quantos funcionários trabalham nesta unidade?"
        value={formData.A08 || ''}
        onChange={(value) => onFormDataChange('A08', value)}
        type="number"
        required
      />
      {/* A09 - Preencha o quadro de funcionários por cargo: (will be more complex) */}
      {/* For now, a simple text input for A09 */} 
      <TextInput
        id="A09"
        label="A09 — Preencha o quadro de funcionários por cargo (resumo):"
        value={formData.A09 || ''}
        onChange={(value) => onFormDataChange('A09', value)}
        placeholder="Ex: 10 Professores, 2 Coordenadores, 3 Limpeza"
        required
      />
      <RadioGroup
        id="A10"
        label="A10 — A escola possui trabalhadores terceirizados atuando em suas dependências?"
        value={formData.A10 || ''}
        onChange={(value) => onFormDataChange('A10', value)}
        options={yesNoOptions}
        required
      />
      {formData.A10 === 'sim' && (
        <TextInput
          id="A10_sub"
          label="Quais serviços são terceirizados?"
          value={formData.A10_sub || ''}
          onChange={(value) => onFormDataChange('A10_sub', value)}
          required
        />
      )}
      <SelectInput
        id="A11"
        label="A11 — A escola possui SESMT (Serviço Especializado em Engenharia de Segurança e Medicina do Trabalho)?"
        value={formData.A11 || ''}
        onChange={(value) => onFormDataChange('A11', value)}
        options={[
          { value: 'proprio', label: 'Sim, próprio' },
          { value: 'contratado', label: 'Sim, contratado externamente' },
          { value: 'nao_possui', label: 'Não possui (atividade não obriga)' },
          { value: 'nao_sei', label: 'Não sei' },
        ]}
        required
      />
      <SelectInput
        id="A12"
        label="A12 — A escola possui CIPA (Comissão Interna de Prevenção de Acidentes) ou Designado de CIPA?"
        value={formData.A12 || ''}
        onChange={(value) => onFormDataChange('A12', value)}
        options={[
          { value: 'cipa', label: 'Sim, CIPA constituída' },
          { value: 'designado', label: 'Sim, Designado de CIPA' },
          { value: 'nao_possui', label: 'Não possui' },
          { value: 'nao_sei', label: 'Não sei se somos obrigados' },
        ]}
        required
      />
    </div>
  );
};

export default BlockA;
