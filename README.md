# 👤 Photo Manager - User Service

Microserviço responsável pela autenticação e gerenciamento de usuários do Photo Manager.

## 🚀 Tecnologias

- **NestJS 11** - Framework Node.js
- **Prisma 7** - ORM
- **PostgreSQL** - Banco de dados
- **Better Auth** - Sistema de autenticação
- **Swagger** - Documentação da API

## 📁 Estrutura do Projeto

```
src/
├── application/
│   └── services/
│       └── user.service.ts      # Lógica de negócio de usuários
├── domain/
│   ├── entities/
│   │   └── user.entity.ts       # Entidade de usuário
│   └── repositories/
│       └── user.repo.ts         # Interface do repositório
├── infrastructure/
│   ├── controllers/
│   │   └── user.controller.ts   # Endpoints de usuário
│   ├── db/
│   │   └── prisma/              # Configuração do Prisma
│   │       ├── prisma.service.ts
│   │       ├── prisma.context.ts
│   │       ├── transaction-context.ts
│   │       └── transactional.decorator.ts
│   └── repositories/
│       └── prisma-user.repo.ts  # Implementação do repositório
├── auth.ts                       # Configuração do Better Auth
├── app.module.ts
└── main.ts
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm start:dev      # Inicia em modo watch
pnpm start:debug    # Inicia em modo debug

# Build
pnpm build          # Compila o projeto

# Produção
pnpm start:prod     # Executa o build de produção

# Testes
pnpm test           # Executa testes unitários
pnpm test:watch     # Testes em modo watch
pnpm test:cov       # Testes com cobertura
pnpm test:e2e       # Testes end-to-end

# Prisma
pnpm prisma:generate   # Gera o cliente Prisma
pnpm prisma:create     # Cria nova migration
pnpm prisma:migrate    # Executa migrations
pnpm prisma:studio     # Abre Prisma Studio

# Lint
pnpm lint           # Executa ESLint
pnpm format         # Formata código com Prettier
```

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgres://user:password@localhost:5432/photomanager

# Server
PORT=3000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# Redis (opcional, para sessões)
REDIS_URL=redis://localhost:6379
```

### Instalação

```bash
# Instalar dependências
pnpm install

# Gerar cliente Prisma
pnpm prisma:generate

# Executar migrations
pnpm prisma:migrate

# Iniciar em modo desenvolvimento
pnpm start:dev
```

O serviço estará disponível em `http://localhost:3000`.

## 📖 API Endpoints

### Autenticação (Better Auth)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/sign-up/email` | Registro com email |
| POST | `/api/auth/sign-in/email` | Login com email |
| POST | `/api/auth/sign-out` | Logout |
| GET | `/api/auth/session` | Obter sessão atual |
| POST | `/api/auth/forget-password` | Recuperar senha |
| POST | `/api/auth/reset-password` | Redefinir senha |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users/v1/me` | Dados do usuário logado |
| PATCH | `/users/v1/me` | Atualizar perfil |

### Documentação Swagger

Acesse `http://localhost:3000/docs` para a documentação interativa.

## 🎯 Funcionalidades

### Autenticação
- ✅ Registro de usuários
- ✅ Login com email/senha
- ✅ Gerenciamento de sessões
- ✅ Tokens JWT
- ✅ Recuperação de senha
- ✅ Logout

### Usuários
- ✅ Perfil do usuário
- ✅ Atualização de dados

### Transações
- ✅ Decorator `@Transactional()` para transações automáticas
- ✅ Contexto de transação compartilhado
- ✅ Rollback automático

## 🔐 Better Auth

Este serviço utiliza o **Better Auth** como sistema de autenticação, que fornece:

- Autenticação segura com email/senha
- Gerenciamento de sessões
- Tokens JWT
- Suporte a múltiplos provedores (configurável)

### Configuração do Auth

```typescript
// src/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@thallesp/nestjs-better-auth';

export const auth = betterAuth({
  database: prismaAdapter(prisma),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // Atualiza a cada dia
  },
});
```


## 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes com cobertura
pnpm test:cov

# Testes E2E
pnpm test:e2e
```

## 🔧 Debug

### VSCode Launch Configuration

```json
{
  "name": "Debug user-service",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["run", "start:debug"],
  "console": "integratedTerminal",
  "restart": true,
  "sourceMaps": true
}
```

## 🐳 Docker

### Build da imagem

```bash
docker build -t photo-manager-user-service .
```

### Executar container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgres://... \
  -e BETTER_AUTH_SECRET=... \
  photo-manager-user-service
```

## 🔗 Integração com Outros Serviços

O User Service é utilizado pelos outros serviços para:

1. **Validação de tokens**: O Photo Service valida tokens JWT através do endpoint `/api/auth/session`
2. **Identificação de usuários**: Todos os recursos são associados ao `userId` do usuário autenticado

## 📄 Licença

Este projeto é privado e de uso restrito.
