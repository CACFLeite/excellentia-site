import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Excellentia',
  description: 'Política de Privacidade da Excellentia conforme a LGPD (Lei 13.709/2018).',
}

export default function PrivacidadePage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">
            Política de Privacidade
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Última atualização: 19 de março de 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            {/* 1. Identificação do Controlador */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">1. Identificação do Controlador</h2>
              <p>
                A <strong>CACFL Educacional</strong>, inscrita no CNPJ sob o n.º{' '}
                <strong>50.939.805/0001-73</strong>, com sede em São Paulo/SP, é a controladora dos
                dados pessoais tratados no âmbito da plataforma Excellentia
                (<strong>excellentia-edu.com</strong>).
              </p>
              <p className="mt-2">
                Encarregado de Dados (DPO):{' '}
                <a
                  href="mailto:juridico@excellentia-edu.com"
                  className="text-gold hover:underline"
                >
                  juridico@excellentia-edu.com
                </a>
              </p>
            </section>

            {/* 2. Base Legal */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">2. Base Legal</h2>
              <p>
                O tratamento de dados pessoais pela Excellentia fundamenta-se nas seguintes hipóteses
                previstas na Lei n.º 13.709/2018 (LGPD):
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Execução de contrato</strong> — para prestação dos serviços educacionais
                  contratados (art. 7.º, V, LGPD).
                </li>
                <li>
                  <strong>Legítimo interesse</strong> — para melhorias na plataforma, segurança e
                  comunicações relacionadas ao serviço (art. 7.º, IX, LGPD).
                </li>
                <li>
                  <strong>Consentimento</strong> — para cookies de análise e comunicações de
                  marketing (art. 7.º, I, LGPD).
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal</strong> — para retenção de dados fiscais
                  (art. 7.º, II, LGPD).
                </li>
              </ul>
            </section>

            {/* 3. Dados Coletados */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">3. Dados Coletados</h2>
              <p>Coletamos os seguintes dados pessoais:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Dados cadastrais:</strong> nome completo e endereço de e-mail, fornecidos
                  no momento do cadastro ou compra.
                </li>
                <li>
                  <strong>Dados de pagamento:</strong> processados exclusivamente pela Stripe, Inc.
                  Não armazenamos número de cartão, CVV ou dados bancários em nossos servidores.
                </li>
                <li>
                  <strong>Dados de uso da plataforma:</strong> cursos acessados, progresso, aulas
                  assistidas, respostas enviadas, feedback formativo, certificados emitidos.
                </li>
                <li>
                  <strong>Dados escolares/NR-1:</strong> vínculo com escola ou unidade, cargo/função,
                  CPF para certificado, registros de convite, aceite, conclusão e comunicações enviadas
                  pelo canal institucional.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas
                  visitadas, tempo de sessão — coletados via cookies (mediante consentimento para
                  analytics).
                </li>
              </ul>
            </section>

            {/* 4. Finalidade */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">4. Finalidade do Tratamento</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Prestação dos serviços educacionais contratados.</li>
                <li>Processamento de cobranças e controle de assinaturas.</li>
                <li>Emissão de certificados de conclusão.</li>
                <li>Gestão de treinamentos obrigatórios, evidências de participação, relatórios escolares e apoio ao Programa de Gerenciamento de Riscos (PGR), quando contratado pela escola.</li>
                <li>Operação de canal de comunicação/denúncia, preservando anonimato quando essa opção for selecionada pelo titular.</li>
                <li>Comunicações sobre o serviço, atualizações e novidades (com opção de descadastro).</li>
                <li>Cumprimento de obrigações legais e fiscais.</li>
                <li>Melhoria contínua da plataforma por meio de análise de dados agregados.</li>
              </ul>
            </section>

            {/* 5. Retenção */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">5. Retenção de Dados</h2>
              <p>
                Os dados pessoais são mantidos enquanto durar a relação contratual. Após o
                encerramento, os dados são retidos por <strong>5 (cinco) anos</strong> para
                cumprimento de obrigações fiscais e legais, conforme legislação aplicável,
                e então eliminados de forma segura.
              </p>
            </section>

            {/* 6. Transferência Internacional */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">6. Transferência Internacional de Dados</h2>
              <p>
                Seus dados podem ser tratados por fornecedores de infraestrutura e comunicação,
                inclusive com transferência internacional quando tecnicamente necessário, sempre
                com salvaguardas adequadas:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Stripe, Inc.</strong> — processamento de pagamentos. A transferência é
                  amparada por Cláusulas Contratuais Padrão (SCCs) aprovadas pela Comissão Europeia
                  e equivalentes aplicáveis à LGPD.
                </li>
                <li>
                  <strong>Vercel, Inc.</strong> — hospedagem da plataforma. A transferência é
                  amparada pelas mesmas salvaguardas (SCCs).
                </li>
                <li>
                  <strong>Neon/Postgres.</strong> — banco de dados utilizado para armazenar registros
                  operacionais da plataforma, como escola, colaboradores, convites, respostas,
                  certificados, PGR e comunicações, com controles de acesso e segurança aplicáveis.
                </li>
                <li>
                  <strong>MailerSend/MailerLite.</strong> — envio de e-mails transacionais, como convites de acesso e avisos operacionais do serviço.
                </li>
              </ul>
            </section>

            {/* 7. Cookies */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">7. Cookies</h2>
              <p>Utilizamos dois tipos de cookies:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Cookies essenciais:</strong> necessários para o funcionamento da plataforma
                  (autenticação de sessão, segurança). Não podem ser desativados sem comprometer o
                  serviço.
                </li>
                <li>
                  <strong>Cookies de análise (analytics):</strong> utilizados para entender como os
                  usuários interagem com o site e melhorar a experiência. Ativados apenas mediante
                  consentimento explícito.
                </li>
              </ul>
              <p className="mt-2">
                Você pode gerenciar suas preferências de cookies a qualquer momento pelo banner
                exibido em sua primeira visita ou entrando em contato com nossa equipe.
              </p>
            </section>

            {/* 8. Direitos do Titular */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">8. Direitos do Titular</h2>
              <p>
                Em conformidade com o art. 18 da LGPD, você tem direito a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Acesso:</strong> confirmar a existência e obter cópia dos seus dados.</li>
                <li><strong>Correção:</strong> solicitar atualização de dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Exclusão:</strong> pedir a eliminação dos seus dados (sujeito a obrigações legais de retenção).</li>
                <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado e interoperável.</li>
                <li><strong>Revogação do consentimento:</strong> retirar o consentimento a qualquer momento, sem prejuízo do tratamento anterior.</li>
                <li><strong>Oposição:</strong> opor-se ao tratamento baseado em legítimo interesse.</li>
                <li><strong>Informação sobre compartilhamento:</strong> saber com quais terceiros seus dados são compartilhados.</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
                <a
                  href="mailto:juridico@excellentia-edu.com"
                  className="text-gold hover:underline"
                >
                  juridico@excellentia-edu.com
                </a>{' '}
                ou{' '}
                <a
                  href="mailto:atendimento@excellentia-edu.com"
                  className="text-gold hover:underline"
                >
                  atendimento@excellentia-edu.com
                </a>
                . Respondemos em até 15 dias úteis.
              </p>
              <p className="mt-3">
                Para proteger o titular e evitar entrega indevida de dados a terceiros, solicitações
                de acesso, cópia, portabilidade ou exclusão poderão exigir verificação razoável de
                identidade, confirmação por canal já vinculado ao cadastro, validação de dados
                mínimos e, quando aplicável, comprovação de poderes de representação. A Excellentia
                poderá recusar ou suspender o atendimento quando houver dúvida fundada sobre a
                identidade do solicitante ou risco de fraude.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">9. Canal de comunicação e anonimato</h2>
              <p>
                Quando a plataforma oferecer canal de comunicação ou denúncia, o usuário poderá escolher
                se deseja se identificar ou enviar relato anônimo, conforme o fluxo disponível. Relatos
                anônimos são exibidos à escola sem identificação direta do colaborador. A Excellentia pode
                manter registros técnicos mínimos para segurança, auditoria e prevenção de abuso, com acesso
                restrito.
              </p>
            </section>

            {/* 10. Segurança */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">10. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
                contra acesso não autorizado, perda, alteração ou divulgação indevida, incluindo
                criptografia em trânsito (HTTPS/TLS) e controle de acesso.
              </p>
            </section>

            {/* 11. Alterações */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">11. Alterações nesta Política</h2>
              <p>
                Esta Política pode ser atualizada periodicamente. Alterações relevantes serão
                comunicadas por aviso na plataforma e/ou por e-mail quando houver canal de contato
                válido e fluxo operacional ativo para essa comunicação. A data da última atualização
                está indicada no início deste documento.
              </p>
            </section>

            {/* 12. Contato */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">12. Contato e DPO</h2>
              <p>
                Dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais
                devem ser encaminhadas ao nosso Encarregado de Dados (DPO):
              </p>
              <p className="mt-2">
                📧{' '}
                <a
                  href="mailto:juridico@excellentia-edu.com"
                  className="text-gold hover:underline"
                >
                  juridico@excellentia-edu.com
                </a>
              </p>
              <p className="mt-1">
                Você também tem o direito de apresentar reclamação à Autoridade Nacional de Proteção
                de Dados (ANPD) em{' '}
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  www.gov.br/anpd
                </a>
                .
              </p>
            </section>

          </div>
        </div>
      </div>
    </section>
  )
}
