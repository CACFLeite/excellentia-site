// src/app/pgr/formulario/components/BlockE.tsx
import React from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';

interface BlockEProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const yesNoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const catOptions = [
  { value: 'todos', label: 'Sim, CAT emitida para todos os acidentes' },
  { value: 'alguns', label: 'Sim, para alguns' },
  { value: 'nenhuma', label: 'Não, nenhuma CAT foi emitida' },
  { value: 'nao_sei', label: 'Não sei o que é CAT' },
];

const BlockE: React.FC<BlockEProps> = ({ formData, onFormDataChange }) => {
  const teveAcidente = formData.E01 === 'sim';
  const teveAfastamento = formData.E04 === 'sim';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">BLOCO E — Histórico de Acidentes e Afastamentos</h2>
      <p className="text-sm text-gray-600">Registros dos últimos 12 meses. Informações confidenciais — usadas apenas para o PGR.</p>

      <RadioGroup
        id="E01"
        label="E01 — Ocorreu algum acidente de trabalho nos últimos 12 meses? (Com ou sem afastamento — incluindo acidentes de trajeto)"
        value={formData.E01 || ''}
        onChange={(value) => onFormDataChange('E01', value)}
        options={yesNoOptions}
        required
      />

      {teveAcidente && (
        <>
          <TextInput
            id="E02_quantidade"
            label="E02 — Quantos acidentes ocorreram?"
            value={formData.E02_quantidade || ''}
            onChange={(value) => onFormDataChange('E02_quantidade', value)}
            type="number"
            required
          />
          <TextInput
            id="E02_descricao"
            label="E02 — Descreva brevemente cada acidente:"
            value={formData.E02_descricao || ''}
            onChange={(value) => onFormDataChange('E02_descricao', value)}
            placeholder="Ex: 1 queda de funcionária de limpeza no corredor molhado — sem afastamento"
            required
          />
          <SelectInput
            id="E03"
            label="E03 — Foi emitida CAT (Comunicação de Acidente de Trabalho) para os acidentes ocorridos?"
            value={formData.E03 || ''}
            onChange={(value) => onFormDataChange('E03', value)}
            options={catOptions}
            required
          />
        </>
      )}

      <RadioGroup
        id="E04"
        label="E04 — Houve afastamentos por doença ocupacional nos últimos 12 meses? (LER/DORT, disfonia, Burnout, depressão, etc.)"
        value={formData.E04 || ''}
        onChange={(value) => onFormDataChange('E04', value)}
        options={yesNoOptions}
        required
      />

      {teveAfastamento && (
        <>
          <TextInput
            id="E05_quantidade"
            label="E05 — Quantos afastamentos ocorreram?"
            value={formData.E05_quantidade || ''}
            onChange={(value) => onFormDataChange('E05_quantidade', value)}
            type="number"
            required
          />
          <TextInput
            id="E05_motivo"
            label="E05 — Por qual motivo? Descreva:"
            value={formData.E05_motivo || ''}
            onChange={(value) => onFormDataChange('E05_motivo', value)}
            placeholder="Ex: 2 professoras com problemas vocais — 15 dias cada; 1 auxiliar com LER no punho — 30 dias"
            required
          />
        </>
      )}

      <RadioGroup
        id="E06"
        label="E06 — Houve quase-acidentes ou situações de risco identificadas nos últimos 12 meses? (opcional)"
        value={formData.E06 || ''}
        onChange={(value) => onFormDataChange('E06', value)}
        options={yesNoOptions}
      />
      {formData.E06 === 'sim' && (
        <TextInput
          id="E06_descricao"
          label="Descreva os quase-acidentes ou situações de risco identificadas:"
          value={formData.E06_descricao || ''}
          onChange={(value) => onFormDataChange('E06_descricao', value)}
          placeholder="Ex: Fio elétrico quase exposto foi notado pelo zelador antes de causar dano"
        />
      )}
    </div>
  );
};

export default BlockE;
