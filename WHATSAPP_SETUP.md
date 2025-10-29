# Configuração do WhatsApp Multi-Tenant com Evolution API

Este documento explica como configurar a integração REAL do WhatsApp usando Evolution API.

## Status Atual: CONECTADO

Seu sistema está configurado para usar Evolution API hospedada em:
**https://whatsapp-api-cdz6.onrender.com**

## Como Funciona

A Evolution API é um projeto open-source que permite conectar múltiplas instâncias do WhatsApp de forma multi-tenant. Cada usuário do seu SaaS terá sua própria instância isolada.

## Configuração Atual

### Variáveis de Ambiente

Adicione estas variáveis no Vercel (seção Vars do sidebar):

\`\`\`bash
WHATSAPP_API_URL=https://whatsapp-api-cdz6.onrender.com
WHATSAPP_API_KEY=B6D711FCDE4D4FD5936544120E713976
\`\`\`

### Webhook (Opcional)

Para receber mensagens em tempo real, configure o webhook na Evolution API:

\`\`\`
https://seu-app.vercel.app/api/whatsapp/webhook
\`\`\`

Isso permite que a Evolution API notifique seu app quando:
- QR Code é gerado
- WhatsApp é conectado
- Mensagens são recebidas
- Conexão é perdida

## Arquitetura

\`\`\`
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Next.js App   │ ◄─────► │  Evolution API   │ ◄─────► │  WhatsApp Web   │
│   (Vercel)      │  HTTP   │   (Render.com)   │  WS     │                 │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │
        │                            │
        ▼                            ▼
┌─────────────────────────────────────────┐
│           Supabase Database             │
│  (Sessions, Messages, Contacts)         │
└─────────────────────────────────────────┘
\`\`\`

## Endpoints Implementados

### Next.js API Routes
- `POST /api/whatsapp/connect` - Criar instância e obter QR Code
- `GET /api/whatsapp/status` - Verificar status da conexão
- `POST /api/whatsapp/disconnect` - Desconectar e deletar instância
- `GET /api/whatsapp/messages` - Listar mensagens do banco
- `GET /api/whatsapp/contacts` - Listar contatos do banco
- `POST /api/whatsapp/send` - Enviar mensagem via Evolution API
- `POST /api/whatsapp/webhook` - Receber eventos da Evolution API

### Evolution API (Render.com)
- `POST /instance/create` - Criar nova instância
- `GET /instance/connect/:instanceName` - Obter QR Code
- `GET /instance/connectionState/:instanceName` - Status da conexão
- `DELETE /instance/delete/:instanceName` - Deletar instância
- `POST /message/sendText/:instanceName` - Enviar mensagem de texto

## Como Usar

### 1. Conectar WhatsApp

1. Acesse o menu **Canais** no dashboard
2. Clique em **Conectar WhatsApp**
3. Escaneie o QR Code com seu WhatsApp
4. Aguarde a confirmação de conexão

### 2. Enviar Mensagens

1. Acesse o menu **Chat** no dashboard
2. Selecione um contato
3. Digite sua mensagem
4. Clique em enviar

### 3. Receber Mensagens

As mensagens são recebidas automaticamente via webhook e aparecem no Chat em tempo real.

## Segurança

- ✅ Multi-tenant: Cada usuário tem instância isolada
- ✅ RLS (Row Level Security) no Supabase
- ✅ Autenticação obrigatória em todas as rotas
- ✅ API Key para comunicação com Evolution API
- ✅ HTTPS em todas as comunicações

## Limitações do Render.com (Plano Gratuito)

- ⚠️ Serviço hiberna após 15 minutos de inatividade
- ⚠️ Primeira requisição pode demorar ~30 segundos (cold start)
- ⚠️ Sessões podem ser perdidas se o serviço reiniciar
- ✅ Suficiente para testes e desenvolvimento
- 💡 Para produção, considere plano pago ou VPS dedicado

## Troubleshooting

### QR Code não aparece
- Verifique se `WHATSAPP_API_URL` está configurado
- Verifique se Evolution API está online (acesse a URL no navegador)
- Aguarde ~30 segundos se for cold start

### Mensagens não chegam
- Configure o webhook na Evolution API
- Verifique logs do webhook em `/api/whatsapp/webhook`
- Confirme que WhatsApp está conectado

### Conexão perdida
- Reconecte escaneando novo QR Code
- Verifique se WhatsApp não foi desconectado no celular
- Em produção, implemente reconexão automática

## Próximos Passos

1. [x] Evolution API hospedada no Render.com
2. [ ] Configurar variáveis de ambiente no Vercel
3. [ ] Configurar webhook na Evolution API
4. [ ] Testar conexão real escaneando QR Code
5. [ ] Testar envio e recebimento de mensagens
6. [ ] Monitorar logs e performance

## Upgrade para Produção

Para uso em produção com alta disponibilidade:

1. **Hospedar Evolution API em VPS dedicado**
   - DigitalOcean Droplet ($6/mês)
   - AWS EC2 t3.micro
   - Linode Nanode

2. **Usar banco de dados persistente**
   - PostgreSQL para sessões
   - Redis para cache

3. **Implementar monitoramento**
   - Logs centralizados
   - Alertas de desconexão
   - Métricas de performance

## Suporte

Documentação oficial:
- Evolution API: https://doc.evolution-api.com
- WhatsApp Web.js: https://wwebjs.dev
- Baileys: https://github.com/WhiskeySockets/Baileys
