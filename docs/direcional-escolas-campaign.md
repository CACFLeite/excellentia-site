# Campanha Direcional Escolas

## Estado

Landing page criada em `/direcional-escolas`.

CTA aprovado:

> Governança escolar, formação e evidências para proteger sua instituição.

Canal comercial:

- WhatsApp Renata: `(11) 95213-3049`
- Link técnico: `https://wa.me/5511952133049`

## Captação

O formulário da landing envia para:

`POST /api/campaigns/direcional-escolas/lead`

Comportamento:

- valida nome, e-mail, WhatsApp e escola;
- envia notificação interna por e-mail para `EXCELLENTIA_DIRECIONAL_NOTIFY_EMAIL` ou `CONTACT_EMAIL`;
- só envia para MailerLite se `MAILERLITE_DIRECIONAL_ESCOLAS_GROUP_ID` estiver configurado, evitando contato solto sem segmentação.

## Próxima Etapa

Depois do deploy da landing:

1. Confirmar URL final pública.
2. Criar QR code apontando para o WhatsApp da Renata com mensagem de origem Direcional.
3. Criar arte de página inteira da revista com:
   - formato final `205 x 275 mm`;
   - sangria de `5 mm` por lado;
   - arquivo de trabalho `215 x 285 mm`;
   - PDF em `300 dpi`;
   - CTA aprovado;
   - URL visível da landing;
   - QR para WhatsApp da Renata.

Pendente externo:

- confirmar se a arte e a entrevista ficarão lado a lado;
- confirmar deadline final de envio;
- receber eventual especificação técnica adicional da Direcional.
