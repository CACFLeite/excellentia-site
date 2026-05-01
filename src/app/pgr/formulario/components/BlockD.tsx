// src/app/pgr/formulario/components/BlockD.tsx
import React from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';
import CheckboxGroup from './CheckboxGroup';

interface BlockDProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const yesNoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const episOptions = [
  { value: 'luvas_borracha', label: 'Luvas de borracha (limpeza)' },
  { value: 'avental_impermeavel', label: 'Avental impermeável (limpeza / cozinha)' },
  { value: 'bota_borracha', label: 'Bota de borracha (limpeza)' },
  { value: 'luvas_corte', label: 'Luvas de proteção contra corte (cozinha)' },
  { value: 'oculos', label: 'Óculos de proteção (laboratório)' },
  { value: 'jaleco', label: 'Jaleco / Avental de laboratório' },
  { value: 'protetor_auricular', label: 'Protetor auricular' },
  { value: 'mascara', label: 'Máscara cirúrgica / PFF2' },
  { value: 'luvas_descartaveis', label: 'Luvas descartáveis (atendimento de alunos)' },
  { value: 'epi_altura', label: 'Capacete ou cinto de segurança (manutenção/altura)' },
  { value: 'nenhum', label: 'Nenhum EPI é fornecido' },
  { value: 'outro', label: 'Outro (especificar)' },
];

const treinamentosOptions = [
  { value: 'epi', label: 'Treinamento de uso correto de EPIs' },
  { value: 'primeiros_socorros', label: 'Primeiros socorros' },
  { value: 'incendio', label: 'Prevenção e combate a incêndio' },
  { value: 'alimentos', label: 'Higiene e manipulação de alimentos' },
  { value: 'ergonomia', label: 'Ergonomia / Postura no trabalho' },
  { value: 'voz', label: 'Saúde vocal (para professores)' },
  { value: 'saude_mental', label: 'Saúde mental / Prevenção ao Burnout' },
  { value: 'assedio', label: 'Prevenção ao assédio' },
  { value: 'laboratorio', label: 'Segurança no laboratório' },
  { value: 'cipa', label: 'CIPA / Designado de CIPA' },
  { value: 'nenhum', label: 'Nenhum treinamento realizado' },
  { value: 'outro', label: 'Outro (especificar)' },
];

const kitSocorrosOptions = [
  { value: 'completo', label: 'Sim, completo e em local de fácil acesso para os funcionários' },
  { value: 'incompleto', label: 'Sim, mas incompleto ou de difícil acesso' },
  { value: 'nao', label: 'Não possui' },
];

const sinalizacaoOptions = [
  { value: 'completa', label: 'Sim, sinalização completa e adequada' },
  { value: 'basica', label: 'Parcialmente — existe sinalização básica' },
  { value: 'nao', label: 'Não, não há sinalização de segurança' },
];

const simulacrosOptions = [
  { value: 'anual', label: 'Anualmente' },
  { value: 'semestral', label: 'A cada 6 meses' },
  { value: 'raramente', label: 'Raramente / Nunca foi feito' },
];

const pcmsoOptions = [
  { value: 'completo', label: 'Sim, temos PCMSO com médico do trabalho responsável' },
  { value: 'irregular', label: 'Sim, mas de forma irregular ou incompleta' },
  { value: 'apenas_admissional', label: 'Apenas exames admissionais e demissionais' },
  { value: 'nao', label: 'Não realizamos exames periódicos' },
];

const manutencaoOptions = [
  { value: 'preventiva', label: 'Sim, há cronograma de manutenção preventiva' },
  { value: 'corretiva', label: 'Parcialmente — só manutenção corretiva (quando quebra)' },
  { value: 'nao', label: 'Não há controle de manutenção' },
];

const BlockD: React.FC<BlockDProps> = ({ formData, onFormDataChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">BLOCO D — Medidas de Prevenção Existentes</h2>
      <p className="text-sm text-gray-600">O que a escola já faz para proteger os funcionários?</p>

      <CheckboxGroup
        id="D01"
        label="D01 — Quais EPIs (Equipamentos de Proteção Individual) são fornecidos pela escola?"
        values={formData.D01 || []}
        onChange={(values) => onFormDataChange('D01', values)}
        options={episOptions}
        exclusiveValues={['nenhum']}
        required
      />
      {(formData.D01 || []).includes('outro') && (
        <TextInput
          id="D01_outro"
          label="Especifique o outro EPI fornecido:"
          value={formData.D01_outro || ''}
          onChange={(value) => onFormDataChange('D01_outro', value)}
          required
        />
      )}

      <RadioGroup
        id="D02"
        label="D02 — A escola registra o fornecimento de EPIs com assinatura do funcionário (Ficha de EPI)?"
        value={formData.D02 || ''}
        onChange={(value) => onFormDataChange('D02', value)}
        options={yesNoOptions}
        required
      />

      <CheckboxGroup
        id="D03"
        label="D03 — Quais treinamentos de segurança e saúde foram realizados nos últimos 12 meses?"
        values={formData.D03 || []}
        onChange={(values) => onFormDataChange('D03', values)}
        options={treinamentosOptions}
        exclusiveValues={['nenhum']}
        required
      />
      {(formData.D03 || []).includes('outro') && (
        <TextInput
          id="D03_outro"
          label="Especifique o outro treinamento realizado:"
          value={formData.D03_outro || ''}
          onChange={(value) => onFormDataChange('D03_outro', value)}
          required
        />
      )}

      <SelectInput
        id="D04"
        label="D04 — A escola possui kit de primeiros socorros acessível e completo?"
        value={formData.D04 || ''}
        onChange={(value) => onFormDataChange('D04', value)}
        options={kitSocorrosOptions}
        required
      />

      <SelectInput
        id="D05"
        label="D05 — Existe sinalização de segurança nos ambientes de trabalho?"
        value={formData.D05 || ''}
        onChange={(value) => onFormDataChange('D05', value)}
        options={sinalizacaoOptions}
        required
      />

      <RadioGroup
        id="D06"
        label="D06 — A escola possui plano de emergência e evacuação definido?"
        value={formData.D06 || ''}
        onChange={(value) => onFormDataChange('D06', value)}
        options={yesNoOptions}
        required
      />
      {formData.D06 === 'sim' && (
        <SelectInput
          id="D06_simulacros"
          label="Com que frequência são realizados simulacros?"
          value={formData.D06_simulacros || ''}
          onChange={(value) => onFormDataChange('D06_simulacros', value)}
          options={simulacrosOptions}
          required
        />
      )}

      <SelectInput
        id="D07"
        label="D07 — A escola realiza exames médicos periódicos nos funcionários (PCMSO)?"
        value={formData.D07 || ''}
        onChange={(value) => onFormDataChange('D07', value)}
        options={pcmsoOptions}
        required
      />

      <SelectInput
        id="D08"
        label="D08 — A manutenção preventiva dos equipamentos e instalações é realizada regularmente?"
        value={formData.D08 || ''}
        onChange={(value) => onFormDataChange('D08', value)}
        options={manutencaoOptions}
        required
      />
    </div>
  );
};

export default BlockD;
