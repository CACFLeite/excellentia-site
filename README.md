# Excellentia — Site Oficial

**A plataforma do professor profissional**

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Deploy:** Vercel

## Identidade Visual

- Azul marinho: `#0a2749`
- Dourado: `#b07908`
- Dourado claro: `#f4db76`
- Tipografia: Inter (Google Fonts)

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/cursos` | Catálogo de cursos |
| `/curriculo-professor` | LP Currículo (funil ativo) |
| `/sobre` | Sobre Caio Leite e a Excellentia |
| `/blog` | Blog |
| `/blog/[slug]` | Post individual |
| `/contato` | Formulário de contato |
| `/assinatura` | Planos de assinatura (Stripe) |

## API Routes

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/waitlist` | POST | Cadastro no Kit com tag lista-espera-app |
| `/api/contact` | POST | Envio de email via Resend |

## Variáveis de Ambiente

Criar `.env.local` baseado em `.env.local.example`:

```
RESEND_API_KEY=         # Chave Resend para envio de emails
CONTACT_EMAIL=atendimento@excellentia-edu.com
KIT_API_KEY=yjKDVn1i9myc2cljJgH9tQ
KIT_TAG_ID=17671416
```

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy

Push para GitHub → Vercel faz o deploy automático.

Configure as variáveis de ambiente no dashboard da Vercel.
