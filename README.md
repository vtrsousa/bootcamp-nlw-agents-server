# NLW Agents

Projeto desenvolvido durante o evento **NLW (Next Level Week) Agents** da Rocketseat, focado em criar uma aplicação de agentes inteligentes com processamento de áudio e IA.

## 🚀 Tecnologias

- **Runtime**: Node.js com TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL com pgvector
- **ORM**: Drizzle ORM
- **IA**: Google Gemini AI
- **Validação**: Zod
- **Linter/Formatter**: Biome
- **Containerização**: Docker

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Chave da API do Google Gemini

## ⚙️ Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd nlw-agents/server
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
GEMINI_API_KEY=sua_chave_api_gemini
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrações
```bash
npm run db:generate
npm run db:migrate
```

### 6. Popule o banco (opcional)
```bash
npm run db:seed
```

## 🏃‍♂️ Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📊 Estrutura do Banco

O projeto utiliza as seguintes tabelas:
- **rooms**: Salas de conversa
- **questions**: Perguntas dos usuários
- **audio_chunks**: Chunks de áudio processados

## 🔧 Scripts Disponíveis

- `npm run dev`: Executa em modo desenvolvimento com hot reload
- `npm start`: Executa em modo produção
- `npm run db:generate`: Gera migrações do Drizzle
- `npm run db:migrate`: Executa migrações no banco
- `npm run db:seed`: Popula o banco com dados iniciais

## 🌐 Endpoints

- `GET /health`: Health check
- `GET /rooms`: Lista todas as salas
- `POST /rooms`: Cria uma nova sala
- `GET /rooms/:id/questions`: Busca perguntas de uma sala
- `POST /questions`: Cria uma nova pergunta
- `POST /upload-audio`: Upload e processamento de áudio

## 📝 Padrões de Projeto

- **Arquitetura**: API REST com Fastify
- **Validação**: Schema validation com Zod
- **Database**: Migrations com Drizzle ORM
- **Estrutura**: Organização por features/routes
- **Type Safety**: TypeScript em todo o projeto

---

Desenvolvido com 💜 durante o NLW Agents da Rocketseat 