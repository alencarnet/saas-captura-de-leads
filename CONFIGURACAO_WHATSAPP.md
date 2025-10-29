# Configuração do WhatsApp - Passo a Passo

## Problema Atual

Se você está vendo o erro: `Failed to execute 'json' on 'Response': Unexpected token 'I'`

Isso significa que a Evolution API não está respondendo corretamente. Vamos resolver!

## Passo 1: Verificar se a Evolution API está Online

1. Abra no navegador: `https://whatsapp-api-cdz6.onrender.com`
2. Você deve ver uma resposta JSON tipo: `{"status": "ok"}`
3. Se aparecer erro ou página em branco, a API está offline

**Render.com Free Tier entra em sleep após 15 minutos de inatividade!**

### Solução: Acordar a API
- Acesse o dashboard do Render.com
- Vá em "Events" e clique em "Manual Deploy" para acordar o serviço
- Aguarde 2-3 minutos até ficar online

## Passo 2: Configurar a API Key

A Evolution API precisa de uma chave de autenticação.

### No Render.com:
1. Vá em seu serviço no Render
2. Clique em "Environment"
3. Adicione a variável:
   \`\`\`
   AUTHENTICATION_API_KEY=SUA_CHAVE_SECRETA_AQUI
   \`\`\`
4. Clique em "Save Changes"

### No v0 (este projeto):
1. Vá na sidebar → **Vars**
2. Adicione as variáveis:
   \`\`\`
   WHATSAPP_API_URL=https://whatsapp-api-cdz6.onrender.com
   WHATSAPP_API_KEY=SUA_CHAVE_SECRETA_AQUI
   \`\`\`
   (Use a MESMA chave que você configurou no Render)

## Passo 3: Testar a Conexão

1. Vá em **Canais** no menu
2. Clique em "Conectar WhatsApp"
3. Aguarde o QR Code aparecer (pode levar 30 segundos na primeira vez)
4. Escaneie com seu WhatsApp

## Troubleshooting

### Erro: "Internal Server Error"
- A Evolution API está offline ou com erro
- Verifique os logs no Render.com
- Faça um redeploy manual

### Erro: "Unauthorized" ou "Invalid API Key"
- A API Key está incorreta
- Verifique se a chave é a mesma no Render e no v0

### QR Code não aparece
- Aguarde 30-60 segundos (Render free tier é lento)
- Verifique se a API está online
- Veja os logs do navegador (F12 → Console)

### API muito lenta
- Render.com free tier tem limitações
- Considere upgrade para plano pago ($7/mês)
- Ou use Railway.app ($5 crédito/mês)

## Alternativa: Modo Demo

Se não conseguir configurar a Evolution API, o sistema tem um modo demo que simula o WhatsApp para você testar a interface.

## Precisa de Ajuda?

Verifique os logs no console do navegador (F12) e me mostre os erros!
