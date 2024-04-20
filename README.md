# MFC - Medical Facility Coordinator

MFC é uma aplicação desenvolvida para listar postos de saúde, exibir os turnos de cada posto, e permitir que enfermeiros façam login e se candidatem para os turnos.

## Tecnologias usadas
- Vite
- Vitest
- Cypress
- TypeScript
- axios
- Zod
- Material UI
- Hook Form
- Node v20.11.1

## Pré-requisitos

Certifique-se de ter a versão correta do Node.js instalada (v20.11.1). Você pode usar o nvm para gerenciar suas versões do Node.js.
Instalação

```
Clone o repositório e instale as dependências:
git clone git@github.com:ThaSMorato/mfc-front.git
cd [nome-do-projeto]
npm install
```

## Variáveis de ambiente

O projeto utiliza as seguintes variáveis de ambiente:
- `VITE_APP_API_URL` - URL para o backend. [Consulte o repositório do backend para mais detalhes](https://github.com/ThaSMorato/mcf-backend).
- `VITE_APP_STORAGE_FLAG` - Flag para localStorage, onde será adicionado o token de autenticação.
As variáveis de ambiente devem ser adicionadas a um arquivo ﻿.env na raiz do projeto.

## Comandos

- Ambiente de Desenvolvimento: `npm run dev`
- Build do Projeto: `npm run build`
- Teste Unitário: `npm run test`
- Teste E2E: `npm run test:e2e`

## Funcionalidades

- Listagem dos postos de saúde
- Exibição dos turnos em cada posto
- Login para enfermeiros
- Possibilidade dos enfermeiros se candidatarem aos turnos disponíveis
