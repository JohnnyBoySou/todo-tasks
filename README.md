Como Executar o Projeto

1. Clonar o Repositório

git clone https://github.com/JohnnyBoySou/todo-tasks.git
cd todo-tasks

2. Instalar as Dependências

npm install

3. Configurar o Firebase

Crie um projeto no Firebase Console:

Ative o Firestore Database.

Ative a autenticação com Google.

Copie as credenciais do Firebase e cole no arquivo .env:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

4. Rodar o Projeto

npm run dev

5. Executar os Testes

npm run test

Estrutura do Projeto

├── src
│   ├── components
|   |   └── tasks
│   │       ├── add.tsx
│   │       ├── delete.tsx
│   │       ├── edit.tsx
│   │       ├── list.tsx
│   │       └── __tests__
|   |           ├── add.test.tsx
│   │           ├── delete.test.tsx
│   │           ├── edit.test.tsx
│   │           └── list.test.tsx
│   ├── pages
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   └── Tasks.tsx
│   ├── api
│   │   ├── tasks.ts
│   │   └── types.ts
│   ├── services
│   │   └── firebase.ts
│   ├── hooks
│   │   └── useAuth.tsx
│   ├── context
│   │   └── AuthContext.tsx
│   ├── tasks
│   │   ├── add.tsx
│   │   ├── delete.tsx
│   │   ├── list.tsx
│   │   └── edit.tsx
│   └── App.tsx
│   └── index.css
│   └── main.tsx
├── vite.config.ts
└── package.json

Considerações

O projeto foi desenvolvido com componentes de estilo utilizando tailwindcss por baixo dos panos, para facilitar leitura foi-se criado um sistema Componentes editaveis os quais você pode ver na pasta /ui

Foram implementados testes unitários com Vitest para a pasta /componentes onde você pode acessar atraves de __tests__.

