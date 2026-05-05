// src/app/pgr/formulario/components/BlockF.tsx
import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

interface BlockFProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const responsavelOptions = [
  { value: 'diretor', label: 'O próprio Diretor(a) da escola' },
  { value: 'designado', label: 'Um funcionário designado (ex: coordenador, vice-diretor)' },
  { value: 'externo', label: 'Profissional externo contratado (engenheiro de segurança, técnico de SST)' },
  { value: 'consultoria', label: 'Empresa de consultoria em SST' },
];

const registroProfissionalOptions = [
  { value: 'tecnico_sst', label: 'Sim — Técnico de Segurança do Trabalho (informe o nº de registro abaixo)' },
  { value: 'engenheiro', label: 'Sim — Engenheiro de Segurança do Trabalho (informe o CREA abaixo)' },
  { value: 'medico', label: 'Sim — Médico do Trabalho (informe o CRM abaixo)' },
  { value: 'nao', label: 'Não — é o diretor ou funcionário designado sem formação específica em SST' },
];

const revisaoOptions = [
  { value: 'anual', label: 'Anualmente (mínimo exigido pela NR-1)' },
  { value: 'semestral', label: 'A cada 6 meses' },
  { value: 'mudancas', label: 'Sempre que houver mudança significativa nos ambientes ou atividades' },
  { value: 'anual_mais_mudancas', label: 'Anualmente + quando houver mudança (recomendado)' },
];

const BlockF: React.FC<BlockFProps> = ({ formData, onFormDataChange }) => {
  const temRegistro = ['tecnico_sst', 'engenheiro', 'medico'].includes(formData.F04 || '');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">BLOCO F — Responsável pelo PGR</h2>
      <p className="text-sm text-gray-600">Identificação de quem a escola designa para preencher, assinar, guardar e revisar o PGR. Pode ser responsável interno ou apoio externo, conforme a realidade da escola e os riscos envolvidos.</p>

      <SelectInput
        id="F01"
        label="F01 — Quem será o responsável pelo Gerenciamento de Riscos Ocupacionais (GRO) nesta escola?"
        value={formData.F01 || ''}
        onChange={(value) => onFormDataChange('F01', value)}
        options={responsavelOptions}
        required
      />

      <TextInput
        id="F02"
        label="F02 — Qual é o nome completo do responsável pelo PGR?"
        value={formData.F02 || ''}
        onChange={(value) => onFormDataChange('F02', value)}
        required
      />

      <TextInput
        id="F03"
        label="F03 — Qual é o cargo/função do responsável?"
        value={formData.F03 || ''}
        onChange={(value) => onFormDataChange('F03', value)}
        placeholder="Ex: Diretora Pedagógica, Técnico de Segurança do Trabalho"
        required
      />

      <SelectInput
        id="F04"
        label="F04 — O responsável possui registro profissional em SST?"
        value={formData.F04 || ''}
        onChange={(value) => onFormDataChange('F04', value)}
        options={registroProfissionalOptions}
        required
      />

      {temRegistro && (
        <TextInput
          id="F04_registro"
          label="Informe o número do registro profissional (CREA / CRM / Nº Registro MTE):"
          value={formData.F04_registro || ''}
          onChange={(value) => onFormDataChange('F04_registro', value)}
          placeholder="Ex: CREA-SP 12345678 ou Registro MTE 00001/SP"
          required
        />
      )}

      <TextInput
        id="F05_email"
        label="F05 — Qual é o e-mail do responsável pelo PGR?"
        value={formData.F05_email || ''}
        onChange={(value) => onFormDataChange('F05_email', value)}
        type="email"
        required
      />

      <TextInput
        id="F05_telefone"
        label="F05 — Qual é o telefone do responsável pelo PGR?"
        value={formData.F05_telefone || ''}
        onChange={(value) => onFormDataChange('F05_telefone', value)}
        placeholder="Ex: (11) 3333-4444 ou (11) 99999-9999"
        mask="phone"
        inputMode="tel"
        maxLength={15}
        pattern="^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$"
        helperText="Use o padrão (DDD) número fixo ou móvel."
        required
      />

      <SelectInput
        id="F06"
        label="F06 — Com que frequência o responsável pretende revisar e atualizar o PGR?"
        value={formData.F06 || ''}
        onChange={(value) => onFormDataChange('F06', value)}
        options={revisaoOptions}
        required
      />

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>📋 Aviso Legal:</strong> O PGR gerado deve ser armazenado por no mínimo <strong>20 anos</strong>.
          A escola continua responsável pela guarda e apresentação do documento às autoridades e trabalhadores quando exigido. A Excellentia pode manter cópia digital e registros de geração na plataforma enquanto houver contrato/obrigação aplicável, como apoio documental e trilha de evidência.
          Base legal: NR-1 (Portaria MTE nº 1.419/2024, vigência 26/05/2025).
        </p>
      </div>
    </div>
  );
};

export default BlockF;
