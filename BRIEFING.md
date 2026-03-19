# BRIEFING — Site Excellentia (Next.js do zero)

## Contexto
O site atual (WordPress + Elementor na Hostinger) está sendo descontinuado.
Construir site profissional em Next.js 14 (App Router) + Tailwind CSS.
Deploy: Vercel. Domínio: excellentia-edu.com.

## Identidade Visual (OBRIGATÓRIA)
- Azul marinho: #0a2749 (fundo principal, headers)
- Dourado escuro: #b07908 (CTAs, destaques, hover)
- Dourado claro: #f4db76 (acentos sutis)
- Branco: #ffffff (texto sobre fundo escuro)
- Cinza claro: #f8f8f8 (fundos secundários)
- Tipografia: Inter (Google Fonts)
- NÃO usar verde, roxo ou cores fora da paleta acima
- Tom: profissional, autoridade, parceria — NUNCA infantil

## Posicionamento
Nome: Excellentia
Tagline: "A plataforma do professor profissional"
Subtítulo: "Carreira. Direitos. Saúde. Tudo que nenhuma faculdade te ensinou sobre ser professor."
Público: professores de escolas particulares Brasil
Fundador: Caio Leite — professor há 17 anos na rede privada de SP

## Foto do Caio (usar no site)
URL: https://excellentia-edu.com/wp-content/uploads/2026/03/caio-leite-excellentia.jpg
(homem, terno escuro, fundo neutro, postura profissional)

## Páginas a construir

### 1. Home (/)
Seções:
- Hero: título "A plataforma do professor profissional" + subtítulo + CTA "Começar agora" (→ /assinatura) + CTA secundário "Ver cursos" (→ /cursos)
- Pilares (3 cards): Carreira / Direitos / Saúde
- Sobre Caio: foto + bio curta + 17 anos de experiência
- Seção App (lista de espera): "O app está chegando" + formulário de email (Kit)
- CTA final: botão dourado "Assinar agora — R9/mês"

### 2. Cursos (/cursos)
- Curso ativo: "Gestão de Carreira para Professores" — R9/mês (assinatura) — CTA "Assinar"
- Em breve (cards com badge): Cotidiano Escolar / Saúde Emocional / NR1 / Lei Lucas

### 3. LP Currículo (/curriculo-professor)
ATENÇÃO: Esta página é o funil de entrada ativo. Deve ser preservada com:
- Headline: "Seu currículo em 24h, feito por quem conhece o processo seletivo das escolas"
- Formulário de 5 campos (nome, email, experiência, área, escola desejada) → POST para /api/waitlist
- Vídeo embed (placeholder — URL a definir pelo Caio)
- Sem menu de navegação completo nessa página (LP dedicada)

### 4. Sobre (/sobre)
- Foto do Caio (grande)
- Bio completa: 17 anos professor rede privada SP, fundador Excellentia, missão de valorizar o professor
- Os 3 pilares do Excellentia

### 5. Contato (/contato)
- Formulário: Nome, Email, Assunto, Mensagem → POST para /api/contact
- Email de destino: atendimento@excellentia-edu.com (via variável de ambiente)

### 6. Blog (/blog)
- Listagem de posts (MDX ou array estático)
- 2 posts iniciais (migrar conteúdo do WordPress):
  - "Como se preparar para processos seletivos em escolas particulares"
  - "NR1 nas escolas: o que todo gestor escolar precisa saber"

### 7. Assinatura (/assinatura)
- Cards: Mensal R9/mês vs Anual R88/ano (R9/mês)
- Botão Mensal → https://buy.stripe.com/9B67sLcrc5Q55oG0nZ6c000
- Botão Anual → https://buy.stripe.com/cNi7sL4YK0vL7wO4Ef6c001
- Garantia 7 dias

## API Routes

### /api/waitlist (POST)
Cria subscriber no Kit e aplica tag "lista-espera-app" (ID: 17671416)
- ConvertKit API Key v3: ${KIT_API_KEY}
- Endpoint Kit v4: POST https://api.kit.com/v4/subscribers (Bearer token: ${KIT_BEARER_TOKEN})
- Tag via v3: POST https://api.convertkit.com/v3/tags/17671416/subscribe?api_key=${KIT_API_KEY}

### /api/contact (POST)
Envia email para atendimento@excellentia-edu.com
- Usar Resend (https://resend.com — gratuito 3000 emails/mês) ou nodemailer
- Configurar via env RESEND_API_KEY (a ser preenchido depois) ou SMTP
- Por agora: usar fetch para Formspree ou EmailJS como fallback

## Componentes reutilizáveis
- Navbar: logo "Excellentia" + links (Cursos / Sobre / Blog / Contato) + botão "Assinar" dourado
- Footer: logo + links + "© 2026 Excellentia"
- Button: variantes primary (dourado) e secondary (outline)
- CourseCard: imagem/ícone + título + status badge (ativo/em breve)

## Referência de qualidade visual
Comparável ao site do Mente Conexa (repertorio.menteconexa.com.br) — clean, profissional, mobile-first.
O app Flutter do Excellentia usa as mesmas cores — consistência é obrigatória.

## Deploy
- Após construir: git init + commit + push para GitHub (CACFLeite/excellentia-site)
- Token GitHub: ${GITHUB_TOKEN}
- Configurar vercel.json se necessário

## Aviso final quando terminar
Quando completamente terminado, rodar:
openclaw system event --text "Site Excellentia Next.js concluído — pronto para review do Caio em /root/projects/excellentia-site" --mode now
