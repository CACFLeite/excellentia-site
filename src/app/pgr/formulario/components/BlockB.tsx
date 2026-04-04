// src/app/pgr/formulario/components/BlockB.tsx
import React from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';
import CheckboxGroup from './CheckboxGroup';

interface BlockBProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const ambientesOptions = [
  { value: 'salas_aula', label: 'Salas de aula' },
  { value: 'sala_professores', label: 'Sala dos professores' },
  { value: 'diretoria_secretaria', label: 'Diretoria / Secretaria' },
  { value: 'coordenacao', label: 'Coordenação pedagógica' },
  { value: 'lab_informatica', label: 'Laboratório de informática' },
  { value: 'lab_ciencias', label: 'Laboratório de ciências (química, biologia, física)' },
  { value: 'biblioteca', label: 'Biblioteca / Sala de leitura' },
  { value: 'quadra_coberta', label: 'Quadra esportiva coberta' },
  { value: 'quadra_descoberta', label: 'Quadra esportiva descoberta' },
  { value: 'piscina', label: 'Piscina' },
  { value: 'cozinha_refeitorio', label: 'Cozinha / Refeitório' },
  { value: 'cantina_terceirizada', label: 'Cantina terceirizada' },
  { value: 'banheiros', label: 'Banheiros (alunos e funcionários)' },
  { value: 'lavanderia', label: 'Lavanderia' },
  { value: 'almoxarifado', label: 'Almoxarifado / Depósito' },
  { value: 'area_externa', label: 'Área externa / Pátio / Jardim' },
  { value: 'estacionamento', label: 'Estacionamento' },
  { value: 'casa_maquinas', label: 'Casa de máquinas / Caldeira' },
  { value: 'outro', label: 'Outro (especificar)' },
];

const faixaEtariaOptions = [
  { value: '0_3', label: '0 a 3 anos (Berçário)' },
  { value: '4_5', label: '4 a 5 anos (Pré-escola)' },
  { value: '6_10', label: '6 a 10 anos (Ensino Fundamental I)' },
  { value: '11_14', label: '11 a 14 anos (Ensino Fundamental II)' },
  { value: '15_17', label: '15 a 17 anos (Ensino Médio)' },
  { value: 'adultos', label: 'Adultos (EJA / Técnico / Superior)' },
];

const turnosOptions = [
  { value: 'manha', label: 'Manhã (ex: 7h às 12h)' },
  { value: 'tarde', label: 'Tarde (ex: 13h às 18h)' },
  { value: 'noite', label: 'Noite (ex: 19h às 22h)' },
  { value: 'integral', label: 'Integral (ex: 7h às 17h)' },
];

const yesNoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const alimentacaoResponsavelOptions = [
  { value: 'propria', label: 'Funcionários da própria escola' },
  { value: 'terceirizada', label: 'Empresa terceirizada' },
  { value: 'combinado', label: 'Combinado' },
];

const frequenciaLabOptions = [
  { value: 'diariamente', label: 'Diariamente' },
  { value: 'semanas', label: 'Algumas vezes por semana' },
  { value: 'meses', label: 'Algumas vezes por mês' },
  { value: 'raramente', label: 'Raramente / Esporadicamente' },
  { value: 'nunca', label: 'Nunca (espaço existe mas não é utilizado)' },
];

const estadoConservacaoOptions = [
  { value: 'bom', label: 'Boa conservação (piso regular, sem buracos ou desnível)' },
  { value: 'razoavel', label: 'Estado razoável (pequenos problemas)' },
  { value: 'ruim', label: 'Estado ruim (piso irregular, trincado ou com risco)' },
  { value: 'nao_sei', label: 'Não sei' },
];

const hasQuadra = (formData: any) =>
  (formData.B01 || []).some((v: string) => v === 'quadra_coberta' || v === 'quadra_descoberta');

const BlockB: React.FC<BlockBProps> = ({ formData, onFormDataChange }) => {
  const ambientesSelecionados: string[] = formData.B01 || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">BLOCO B — Caracterização das Atividades e dos Ambientes</h2>
      <p className="text-sm text-gray-600">Precisamos saber quais espaços a escola tem e quem trabalha em cada um.</p>

      <CheckboxGroup
        id="B01"
        label="B01 — Marque quais espaços/ambientes existem nesta escola:"
        values={ambientesSelecionados}
        onChange={(values) => onFormDataChange('B01', values)}
        options={ambientesOptions}
        required
      />
      {ambientesSelecionados.includes('outro') && (
        <TextInput
          id="B01_outro"
          label="Especifique o outro ambiente:"
          value={formData.B01_outro || ''}
          onChange={(value) => onFormDataChange('B01_outro', value)}
          required
        />
      )}

      {ambientesSelecionados.includes('salas_aula') && (
        <TextInput
          id="B02"
          label="B02 — Quantas salas de aula a escola possui?"
          value={formData.B02 || ''}
          onChange={(value) => onFormDataChange('B02', value)}
          type="number"
          required
        />
      )}

      <CheckboxGroup
        id="B03"
        label="B03 — Qual é a faixa etária dos alunos atendidos?"
        values={formData.B03 || []}
        onChange={(values) => onFormDataChange('B03', values)}
        options={faixaEtariaOptions}
        required
      />

      <CheckboxGroup
        id="B04"
        label="B04 — Em quais turnos a escola funciona?"
        values={formData.B04 || []}
        onChange={(values) => onFormDataChange('B04', values)}
        options={turnosOptions}
        required
      />

      <RadioGroup
        id="B05"
        label="B05 — Os professores utilizam lousa digital, projetor ou tela interativa em sala?"
        value={formData.B05 || ''}
        onChange={(value) => onFormDataChange('B05', value)}
        options={yesNoOptions}
        required
      />

      <RadioGroup
        id="B06"
        label="B06 — A escola oferece alimentação (merenda ou refeição) para os alunos?"
        value={formData.B06 || ''}
        onChange={(value) => onFormDataChange('B06', value)}
        options={yesNoOptions}
        required
      />
      {formData.B06 === 'sim' && (
        <SelectInput
          id="B06_sub"
          label="Quem prepara a alimentação?"
          value={formData.B06_sub || ''}
          onChange={(value) => onFormDataChange('B06_sub', value)}
          options={alimentacaoResponsavelOptions}
          required
        />
      )}

      {ambientesSelecionados.includes('lab_ciencias') && (
        <SelectInput
          id="B07"
          label="B07 — O laboratório de ciências é utilizado com alunos? Com que frequência?"
          value={formData.B07 || ''}
          onChange={(value) => onFormDataChange('B07', value)}
          options={frequenciaLabOptions}
          required
        />
      )}

      {hasQuadra(formData) && (
        <>
          <SelectInput
            id="B08_estado"
            label="B08 — Qual o estado de conservação da quadra esportiva?"
            value={formData.B08_estado || ''}
            onChange={(value) => onFormDataChange('B08_estado', value)}
            options={estadoConservacaoOptions}
            required
          />
          <TextInput
            id="B08_obs"
            label="B08 — Observações adicionais sobre a quadra (opcional):"
            value={formData.B08_obs || ''}
            onChange={(value) => onFormDataChange('B08_obs', value)}
            placeholder="Ex: Quadra coberta de 800m², piso emborrachado em bom estado"
          />
        </>
      )}
    </div>
  );
};

export default BlockB;
