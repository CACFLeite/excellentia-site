// src/app/pgr/formulario/components/BlockC.tsx
import React from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';
import CheckboxGroup from './CheckboxGroup';

interface BlockCProps {
  formData: any;
  onFormDataChange: (key: string, value: any) => void;
}

const yesNoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const yesNoNaoSeiOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'nao_sei', label: 'Não sei' },
];

const yesNoNaoSeAplicaOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'nao_se_aplica', label: 'Não se aplica' },
];

// C.1 — Riscos Físicos
const ruidos = [
  { value: 'muito_barulhento', label: 'Sim, é muito barulhento em vários momentos do dia' },
  { value: 'alguns_momentos', label: 'Sim, em alguns momentos/locais (ex: recreio, refeitório)' },
  { value: 'aceitavel', label: 'Não, o nível de ruído é aceitável' },
  { value: 'nao_sei', label: 'Não sei avaliar' },
];

const funcionariosRuido = [
  { value: 'professores', label: 'Professores em sala de aula' },
  { value: 'prof_ef', label: 'Professor(a) de Educação Física (quadra/pátio)' },
  { value: 'auxiliares', label: 'Auxiliares de classe / Monitores' },
  { value: 'cozinha', label: 'Funcionários da cozinha / Refeitório' },
  { value: 'porteiros', label: 'Porteiros / Vigilância' },
  { value: 'secretaria', label: 'Secretaria (quando próxima ao pátio)' },
  { value: 'todos', label: 'Todos os funcionários (em geral)' },
];

const temperaturaOptions = [
  { value: 'adequada', label: 'Sim, todos os ambientes têm climatização adequada' },
  { value: 'parcial', label: 'Parcialmente — alguns ambientes são muito quentes ou frios' },
  { value: 'nao', label: 'Não, o calor/frio é um problema frequente' },
  { value: 'sazonalmente', label: 'Depende muito da época do ano' },
];

const ambientesTemperaturaOptions = [
  { value: 'salas_aula', label: 'Salas de aula' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'quadra', label: 'Quadra descoberta' },
  { value: 'secretaria', label: 'Secretaria/Diretoria' },
  { value: 'corredores', label: 'Corredores/Pátio' },
  { value: 'deposito', label: 'Depósito/Almoxarifado' },
  { value: 'outro', label: 'Outro' },
];

const iluminacaoOptions = [
  { value: 'adequada', label: 'Sim, a iluminação é adequada em todos os ambientes' },
  { value: 'parcial', label: 'Parcialmente — há ambientes com iluminação insuficiente ou excessiva' },
  { value: 'nao', label: 'Não, é um problema recorrente' },
  { value: 'nao_sei', label: 'Não sei avaliar' },
];

// C.2 — Riscos Químicos
const armazenamentoOptions = [
  { value: 'adequado', label: 'Sim, temos local adequado e organizado' },
  { value: 'parcial', label: 'Parcialmente — temos local, mas não totalmente adequado' },
  { value: 'nao', label: 'Não, os produtos ficam misturados ou sem local definido' },
  { value: 'nao_sei', label: 'Não sei' },
];

// C.3 — Riscos Biológicos
const contatoCriancasDoentesOptions = [
  { value: 'frequente', label: 'Sim, frequentemente — às vezes ficamos com a criança doente por horas' },
  { value: 'ocasional', label: 'Sim, ocasionalmente' },
  { value: 'raramente', label: 'Raramente — quando a criança apresenta sintomas, os pais são chamados imediatamente' },
  { value: 'nao', label: 'Não, não ocorre' },
];

const residuosBiologicosOptions = [
  { value: 'frequente', label: 'Sim, isso ocorre com frequência' },
  { value: 'raramente', label: 'Sim, mas raramente' },
  { value: 'protocolo', label: 'Raramente — e há protocolo definido para isso' },
  { value: 'nao', label: 'Não ocorre' },
];

// C.4 — Riscos Ergonômicos
const tempoPeOptions = [
  { value: 'maior_parte', label: 'A maior parte do tempo (mais de 6 horas em pé)' },
  { value: 'metade', label: 'Metade do tempo (3 a 6 horas em pé)' },
  { value: 'menos_metade', label: 'Menos da metade (até 3 horas em pé)' },
  { value: 'sentados', label: 'Principalmente sentados' },
];

const mobiliarioOptions = [
  { value: 'adequado', label: 'Sim, é confortável e adequado para as atividades' },
  { value: 'parcial', label: 'Parcialmente — há algumas queixas' },
  { value: 'inadequado', label: 'Não, o mobiliário é inadequado ou antigo' },
  { value: 'nao_existe', label: 'Não existe sala dos professores' },
];

const extraHoursOptions = [
  { value: 'frequente', label: 'Sim, frequentemente — faz parte da rotina' },
  { value: 'periodos', label: 'Sim, em períodos específicos (fechamento de notas, eventos)' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'nao', label: 'Não' },
];

const vozOptions = [
  { value: 'maioria', label: 'Sim, elevam a voz na maioria das aulas' },
  { value: 'alguns', label: 'Sim, em algumas aulas ou turmas específicas' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'nao', label: 'Não' },
];

const computadorOptions = [
  { value: 'mais_6h', label: 'Mais de 6 horas por dia (quase todo o tempo)' },
  { value: '3_6h', label: 'Entre 3 e 6 horas por dia' },
  { value: 'menos_3h', label: 'Menos de 3 horas por dia' },
  { value: 'nao_usam', label: 'Não usam computador' },
];

const esforcoFisicoOptions = [
  { value: 'frequente', label: 'Sim, frequentemente' },
  { value: 'ocasional', label: 'Sim, ocasionalmente' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'nao', label: 'Não' },
];

// C.5 — Riscos de Acidentes
const escadasOptions = [
  { value: 'bom', label: 'Sim, todas em boas condições' },
  { value: 'atencao', label: 'Parcialmente — há pontos de atenção' },
  { value: 'ruim', label: 'Não, há problemas que precisam de manutenção' },
  { value: 'nao_ha', label: 'Não há escadas/rampas neste estabelecimento' },
];

const equipamentosCozinhaOptions = [
  { value: 'facas', label: 'Facas e utensílios cortantes' },
  { value: 'fogao', label: 'Fogão / Forno / Fritadeira' },
  { value: 'pressao', label: 'Panelas de pressão' },
  { value: 'liquidificador', label: 'Liquidificador / Processador industrial' },
  { value: 'outro', label: 'Outro' },
];

const instalacaoEletricaOptions = [
  { value: 'revisada', label: 'Sim, passou por revisão recente e está em ordem' },
  { value: 'atencao', label: 'Parcialmente — há pontos de atenção' },
  { value: 'problemas', label: 'Não, há fios expostos ou problemas conhecidos' },
  { value: 'nao_sei', label: 'Não sei' },
];

const extintorOptions = [
  { value: 'treinados', label: 'Sim, temos extintores e os funcionários foram treinados' },
  { value: 'sem_treinamento', label: 'Sim, temos extintores, mas os funcionários não foram treinados' },
  { value: 'vencidos', label: 'Sim, mas alguns extintores estão vencidos ou mal posicionados' },
  { value: 'nao_temos', label: 'Não temos extintores' },
];

const riscoQuedaOptions = [
  { value: 'bom', label: 'Não, está em boas condições' },
  { value: 'piso', label: 'Sim — piso irregular ou escorregadio' },
  { value: 'equipamentos', label: 'Sim — equipamentos esportivos sem manutenção ou sem proteção' },
  { value: 'iluminacao', label: 'Sim — iluminação inadequada' },
  { value: 'outro', label: 'Sim — outro problema' },
];

// C.6 — Riscos Psicossociais
const sobrecargaOptions = [
  { value: 'frequente', label: 'Sim, é uma queixa frequente e generalizada' },
  { value: 'alguns', label: 'Sim, em alguns grupos ou épocas específicas' },
  { value: 'raramente', label: 'Raramente há queixas' },
  { value: 'nao', label: 'Não, a carga de trabalho é adequada' },
  { value: 'nao_avaliado', label: 'Não sei / Nunca foi avaliado' },
];

const violenciaOptions = [
  { value: 'frequente', label: 'Sim, episódios frequentes' },
  { value: 'isolados', label: 'Sim, episódios isolados nos últimos 12 meses' },
  { value: 'nao', label: 'Não, nunca ocorreu' },
  { value: 'desconhece', label: 'Não tenho conhecimento / Não é registrado' },
];

const assedioOptions = [
  { value: 'com_registro', label: 'Sim, com registro formal' },
  { value: 'sem_registro', label: 'Sim, mas não houve registro formal' },
  { value: 'nao', label: 'Não, nunca ocorreu que eu saiba' },
  { value: 'sem_controle', label: 'Não tenho esse tipo de controle' },
];

const reconhecimentoOptions = [
  { value: 'estruturado', label: 'Sim, há uma cultura de reconhecimento estruturada' },
  { value: 'informal', label: 'Sim, de forma informal e esporádica' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'nao', label: 'Não' },
];

const autonomiaOptions = [
  { value: 'ampla', label: 'Sim, têm ampla autonomia' },
  { value: 'parcial', label: 'Parcialmente — há diretrizes que limitam mas dão alguma liberdade' },
  { value: 'pouca', label: 'Pouca autonomia — o trabalho é muito prescrito e controlado' },
  { value: 'nao_sei', label: 'Não sei avaliar' },
];

const BlockC: React.FC<BlockCProps> = ({ formData, onFormDataChange }) => {
  const ambientes: string[] = formData.B01 || [];
  const temLabCiencias = ambientes.includes('lab_ciencias');
  const temCozinhaFuncionarios = ambientes.includes('cozinha_refeitorio') && formData.B06 === 'sim' && formData.B06_sub !== 'terceirizada';
  const temQuadra = ambientes.some((v: string) => v === 'quadra_coberta' || v === 'quadra_descoberta');

  const temProblemaRuido = ['muito_barulhento', 'alguns_momentos'].includes(formData.C01 || '');
  const temProblemaTemperatura = ['parcial', 'nao', 'sazonalmente'].includes(formData.C03 || '');
  const temEquipCozinha = formData.C26 === 'sim';

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-navy">BLOCO C — Identificação de Riscos Ocupacionais</h2>
      <p className="text-sm text-gray-600">A NR-1 exige que a escola identifique todos os perigos aos quais os funcionários estão expostos. Responda pensando nos seus funcionários — não nos alunos.</p>

      {/* C.1 — Riscos Físicos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.1 — Riscos Físicos</h3>

        <SelectInput
          id="C01"
          label="C01 — O nível de ruído no ambiente de trabalho é um problema?"
          value={formData.C01 || ''}
          onChange={(value) => onFormDataChange('C01', value)}
          options={ruidos}
          required
        />

        {temProblemaRuido && (
          <CheckboxGroup
            id="C02"
            label="C02 — Quais funcionários são mais afetados pelo ruído?"
            values={formData.C02 || []}
            onChange={(values) => onFormDataChange('C02', values)}
            options={funcionariosRuido}
            required
          />
        )}

        <SelectInput
          id="C03"
          label="C03 — A temperatura nos ambientes de trabalho é confortável?"
          value={formData.C03 || ''}
          onChange={(value) => onFormDataChange('C03', value)}
          options={temperaturaOptions}
          required
        />

        {temProblemaTemperatura && (
          <CheckboxGroup
            id="C04"
            label="C04 — Se houver problemas de temperatura, em quais ambientes?"
            values={formData.C04 || []}
            onChange={(values) => onFormDataChange('C04', values)}
            options={ambientesTemperaturaOptions}
          />
        )}

        <SelectInput
          id="C05"
          label="C05 — A iluminação das salas de aula e áreas de trabalho é adequada?"
          value={formData.C05 || ''}
          onChange={(value) => onFormDataChange('C05', value)}
          options={iluminacaoOptions}
          required
        />

        <RadioGroup
          id="C06"
          label="C06 — A escola possui alguma fonte de radiação não-ionizante no ambiente de trabalho?"
          value={formData.C06 || ''}
          onChange={(value) => onFormDataChange('C06', value)}
          options={yesNoOptions}
          required
        />
        {formData.C06 === 'sim' && (
          <TextInput
            id="C06_sub"
            label="Qual equipamento? Onde fica? Quem opera?"
            value={formData.C06_sub || ''}
            onChange={(value) => onFormDataChange('C06_sub', value)}
            required
          />
        )}
      </div>

      {/* C.2 — Riscos Químicos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.2 — Riscos Químicos</h3>

        <TextInput
          id="C07"
          label="C07 — Quais produtos de limpeza são utilizados na escola?"
          value={formData.C07 || ''}
          onChange={(value) => onFormDataChange('C07', value)}
          placeholder="Ex: Água sanitária, detergente, desinfetante de piso, álcool 70%"
          required
        />

        <SelectInput
          id="C08"
          label="C08 — Os funcionários que usam produtos de limpeza têm acesso às Fichas de Segurança (FISPQ)?"
          value={formData.C08 || ''}
          onChange={(value) => onFormDataChange('C08', value)}
          options={yesNoNaoSeiOptions.map(o => ({ value: o.value, label: o.label }))}
          required
        />

        {temLabCiencias && (
          <TextInput
            id="C09"
            label="C09 — O laboratório de ciências usa reagentes químicos? Quais?"
            value={formData.C09 || ''}
            onChange={(value) => onFormDataChange('C09', value)}
            placeholder="Ex: Ácido clorídrico, hidróxido de sódio, álcool etílico"
            required
          />
        )}

        <SelectInput
          id="C10"
          label="C10 — Existe local adequado e seguro para armazenamento de produtos químicos e de limpeza?"
          value={formData.C10 || ''}
          onChange={(value) => onFormDataChange('C10', value)}
          options={armazenamentoOptions}
          required
        />

        <RadioGroup
          id="C11"
          label="C11 — A escola realiza fumigação ou dedetização?"
          value={formData.C11 || ''}
          onChange={(value) => onFormDataChange('C11', value)}
          options={yesNoOptions}
          required
        />
        {formData.C11 === 'sim' && (
          <TextInput
            id="C11_sub"
            label="Frequência e empresa responsável pela dedetização:"
            value={formData.C11_sub || ''}
            onChange={(value) => onFormDataChange('C11_sub', value)}
            placeholder="Ex: Semestral, Empresa XYZ"
            required
          />
        )}
      </div>

      {/* C.3 — Riscos Biológicos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.3 — Riscos Biológicos</h3>

        <SelectInput
          id="C12"
          label="C12 — Os professores e auxiliares de classe têm contato direto e frequente com crianças doentes?"
          value={formData.C12 || ''}
          onChange={(value) => onFormDataChange('C12', value)}
          options={contatoCriancasDoentesOptions}
          required
        />

        {temCozinhaFuncionarios && (
          <RadioGroup
            id="C13"
            label="C13 — Os funcionários que trabalham na cozinha manipulam alimentos crus (carnes, ovos, vegetais)?"
            value={formData.C13 || ''}
            onChange={(value) => onFormDataChange('C13', value)}
            options={yesNoOptions}
            required
          />
        )}

        <SelectInput
          id="C14"
          label="C14 — Os funcionários de limpeza lidam com resíduos biológicos?"
          value={formData.C14 || ''}
          onChange={(value) => onFormDataChange('C14', value)}
          options={residuosBiologicosOptions}
          required
        />

        <RadioGroup
          id="C15"
          label="C15 — A escola possui protocolo escrito para casos de doenças infectocontagiosas entre alunos ou funcionários?"
          value={formData.C15 || ''}
          onChange={(value) => onFormDataChange('C15', value)}
          options={yesNoOptions}
          required
        />

        <SelectInput
          id="C16"
          label="C16 — A escola possui lixeira para descarte de materiais biológicos ou perfurocortantes?"
          value={formData.C16 || ''}
          onChange={(value) => onFormDataChange('C16', value)}
          options={[
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
            { value: 'nao_se_aplica', label: 'Não se aplica' },
          ]}
          required
        />
      </div>

      {/* C.4 — Riscos Ergonômicos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.4 — Riscos Ergonômicos</h3>

        <SelectInput
          id="C17"
          label="C17 — Os professores ficam em pé por quanto tempo, em média, durante a jornada de trabalho?"
          value={formData.C17 || ''}
          onChange={(value) => onFormDataChange('C17', value)}
          options={tempoPeOptions}
          required
        />

        <RadioGroup
          id="C18"
          label="C18 — Os professores têm cadeira disponível na sala de aula?"
          value={formData.C18 || ''}
          onChange={(value) => onFormDataChange('C18', value)}
          options={yesNoOptions}
          required
        />

        <SelectInput
          id="C19"
          label="C19 — O mobiliário da sala dos professores (mesa, cadeira) é adequado e confortável?"
          value={formData.C19 || ''}
          onChange={(value) => onFormDataChange('C19', value)}
          options={mobiliarioOptions}
          required
        />

        <SelectInput
          id="C20"
          label="C20 — Os professores costumam realizar trabalho além do horário de aula?"
          value={formData.C20 || ''}
          onChange={(value) => onFormDataChange('C20', value)}
          options={extraHoursOptions}
          required
        />

        <SelectInput
          id="C21"
          label="C21 — Os professores precisam elevar a voz frequentemente para dar aula?"
          value={formData.C21 || ''}
          onChange={(value) => onFormDataChange('C21', value)}
          options={vozOptions}
          required
        />

        <SelectInput
          id="C22"
          label="C22 — Os funcionários da secretaria e administração usam computador? Por quanto tempo em média por dia?"
          value={formData.C22 || ''}
          onChange={(value) => onFormDataChange('C22', value)}
          options={computadorOptions}
          required
        />

        <SelectInput
          id="C23"
          label="C23 — Os funcionários de limpeza precisam carregar peso, agachar ou realizar movimentos repetitivos?"
          value={formData.C23 || ''}
          onChange={(value) => onFormDataChange('C23', value)}
          options={esforcoFisicoOptions}
          required
        />

        {temCozinhaFuncionarios && (
          <SelectInput
            id="C24"
            label="C24 — Os funcionários da cozinha trabalham em postura inadequada ou realizam movimentos muito repetitivos?"
            value={formData.C24 || ''}
            onChange={(value) => onFormDataChange('C24', value)}
            options={[
              { value: 'sim', label: 'Sim' },
              { value: 'nao', label: 'Não' },
              { value: 'nao_se_aplica', label: 'Não se aplica' },
            ]}
            required
          />
        )}
      </div>

      {/* C.5 — Riscos de Acidentes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.5 — Riscos de Acidentes (Mecânicos)</h3>

        <SelectInput
          id="C25"
          label="C25 — As escadas, rampas e corredores da escola estão em boas condições?"
          value={formData.C25 || ''}
          onChange={(value) => onFormDataChange('C25', value)}
          options={escadasOptions}
          required
        />

        {temCozinhaFuncionarios && (
          <>
            <RadioGroup
              id="C26"
              label="C26 — A cozinha possui equipamentos com risco de corte ou queimadura?"
              value={formData.C26 || ''}
              onChange={(value) => onFormDataChange('C26', value)}
              options={yesNoNaoSeAplicaOptions}
              required
            />
            {temEquipCozinha && (
              <CheckboxGroup
                id="C26_equipamentos"
                label="Quais equipamentos?"
                values={formData.C26_equipamentos || []}
                onChange={(values) => onFormDataChange('C26_equipamentos', values)}
                options={equipamentosCozinhaOptions}
                required
              />
            )}
          </>
        )}

        <SelectInput
          id="C27"
          label="C27 — A instalação elétrica da escola está em boas condições?"
          value={formData.C27 || ''}
          onChange={(value) => onFormDataChange('C27', value)}
          options={instalacaoEletricaOptions}
          required
        />

        <SelectInput
          id="C28"
          label="C28 — A escola possui extintor de incêndio e os funcionários sabem como utilizá-lo?"
          value={formData.C28 || ''}
          onChange={(value) => onFormDataChange('C28', value)}
          options={extintorOptions}
          required
        />

        {temLabCiencias && (
          <RadioGroup
            id="C29"
            label="C29 — O laboratório de ciências possui vidraria, materiais cortantes ou inflamáveis?"
            value={formData.C29 || ''}
            onChange={(value) => onFormDataChange('C29', value)}
            options={yesNoNaoSeAplicaOptions}
            required
          />
        )}

        {temQuadra && (
          <CheckboxGroup
            id="C30"
            label="C30 — A quadra esportiva possui algum risco de acidente identificado?"
            values={formData.C30 || []}
            onChange={(values) => onFormDataChange('C30', values)}
            options={riscoQuedaOptions}
            required
          />
        )}

        <RadioGroup
          id="C31"
          label="C31 — Há alguma área de risco de queda em altura nas dependências da escola?"
          value={formData.C31 || ''}
          onChange={(value) => onFormDataChange('C31', value)}
          options={yesNoOptions}
          required
        />
        {formData.C31 === 'sim' && (
          <TextInput
            id="C31_sub"
            label="Descreva onde e quem realiza esse trabalho:"
            value={formData.C31_sub || ''}
            onChange={(value) => onFormDataChange('C31_sub', value)}
            placeholder="Ex: Limpeza de calhas no telhado feita pelo zelador"
            required
          />
        )}
      </div>

      {/* C.6 — Riscos Psicossociais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">C.6 — Riscos Psicossociais</h3>
        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded">⚠️ Esta categoria passou a ser OBRIGATÓRIA no PGR a partir de maio de 2025 (NR-1 atualizada).</p>

        <SelectInput
          id="C32"
          label="C32 — Os professores e funcionários relatam sentir sobrecarga de trabalho?"
          value={formData.C32 || ''}
          onChange={(value) => onFormDataChange('C32', value)}
          options={sobrecargaOptions}
          required
        />

        <SelectInput
          id="C33"
          label="C33 — Já ocorreram episódios de violência (verbal ou física) contra funcionários por parte de alunos ou responsáveis?"
          value={formData.C33 || ''}
          onChange={(value) => onFormDataChange('C33', value)}
          options={violenciaOptions}
          required
        />

        <SelectInput
          id="C34"
          label="C34 — Já foram reportados casos de assédio moral ou sexual entre funcionários?"
          value={formData.C34 || ''}
          onChange={(value) => onFormDataChange('C34', value)}
          options={assedioOptions}
          required
        />

        <RadioGroup
          id="C35"
          label="C35 — Existe canal formal para os funcionários reportarem problemas, conflitos ou situações de sofrimento no trabalho?"
          value={formData.C35 || ''}
          onChange={(value) => onFormDataChange('C35', value)}
          options={yesNoOptions}
          required
        />

        <SelectInput
          id="C36"
          label="C36 — Os professores e funcionários recebem feedback e reconhecimento pelo trabalho realizado?"
          value={formData.C36 || ''}
          onChange={(value) => onFormDataChange('C36', value)}
          options={reconhecimentoOptions}
          required
        />

        <SelectInput
          id="C37"
          label="C37 — Os professores têm autonomia para organizar seu trabalho pedagógico?"
          value={formData.C37 || ''}
          onChange={(value) => onFormDataChange('C37', value)}
          options={autonomiaOptions}
          required
        />

        <RadioGroup
          id="C38"
          label="C38 — A escola adota alguma política de apoio à saúde mental dos funcionários?"
          value={formData.C38 || ''}
          onChange={(value) => onFormDataChange('C38', value)}
          options={yesNoOptions}
          required
        />
        {formData.C38 === 'sim' && (
          <TextInput
            id="C38_sub"
            label="Descreva brevemente as iniciativas existentes:"
            value={formData.C38_sub || ''}
            onChange={(value) => onFormDataChange('C38_sub', value)}
            placeholder="Ex: Psicólogo disponível mensalmente, grupos de apoio"
            required
          />
        )}
      </div>
    </div>
  );
};

export default BlockC;
