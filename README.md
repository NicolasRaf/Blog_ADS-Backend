# API para Blog Pessoal - Backend

Este é o backend para a aplicação de blog, desenvolvido com Node.js, Express e TypeScript. Ele fornece uma API RESTful para gerenciar postagens e comentários, utilizando MongoDB como banco de dados.

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#️-como-rodar-o-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
- [Deploy](#️-deploy)

---

## ✨ Funcionalidades

- [x] Listar todas as postagens.
- [x] Criar uma nova postagem.
- [x] Adicionar comentários a uma postagem existente.
- [x] Conexão segura com o banco de dados MongoDB Atlas.

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução para o JavaScript no servidor.
- **[Express.js](https://expressjs.com/)**: Framework para construção de APIs de forma rápida e minimalista.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Mongoose](https://mongoosejs.com/)**: Biblioteca de modelagem de objetos (ODM) para o MongoDB.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **[CORS](https://www.npmjs.com/package/cors)**: Middleware para habilitar o Cross-Origin Resource Sharing.

---

## 🔧 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/) (gerenciador de pacotes)
- [Git](https://git-scm.com/)

---

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para executar o backend em seu ambiente local.

```bash
# 1. Clone o repositório (caso ainda não tenha feito)
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# 2. Navegue até a pasta do backend
cd seu-repositorio/backend

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Crie o arquivo de variáveis de ambiente
# Copie o arquivo .env.example para um novo arquivo chamado .env
cp .env.example .env

# 5. Preencha o arquivo .env com suas credenciais (veja a seção abaixo)

# 6. Para rodar o servidor em modo de desenvolvimento (com hot-reload)
npm run dev
# ou
yarn dev

# 7. Para rodar o servidor em modo de produção
npm start
# ou
yarn start
```

O servidor estará rodando em `http://localhost:3000`.

---

## 🔑 Variáveis de Ambiente

Para que a aplicação funcione corretamente, você precisa configurar a seguinte variável de ambiente no seu arquivo `.env`:

- `MONGODB_URI`: A string de conexão do seu banco de dados no MongoDB Atlas.

**Exemplo de arquivo `.env`:**

``` Bash
MONGODB_URI="mongodb+srv://seu-usuario:sua-senha@seu-cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority"
```

---

## 🔗 Endpoints da API

Aqui estão os endpoints disponíveis na API:

### Postagens

#### `GET /api/posts`

Retorna uma lista com todas as postagens do banco de dados.

#### `POST /api/posts`

Cria uma nova postagem.

**Corpo da Requisição (JSON):**

```json
{
  "id_secao": "nome-da-secao",
  "titulo": "Título da Postagem",
  "conteudoHTML": "<p>Este é o conteúdo da postagem em <strong>HTML</strong>.</p>"
}
```

### Comentários

#### `POST /api/posts/:postId/comments`

Adiciona um novo comentário a uma postagem específica.

**Parâmetros da URL:**

- `postId`: O ID da postagem que receberá o comentário.

**Corpo da Requisição (JSON):**

```json
{
  "autor": "Nome do Autor do Comentário",
  "texto": "Este é o texto do comentário."
}
```

---

## ☁️ Deploy

Este projeto está pronto para ser publicado em plataformas como **[Render](https://render.com/)** ou **[Railway](https://railway.app/)**.

Lembre-se de configurar as variáveis de ambiente (`MONGODB_URI` e `PORT`) diretamente no painel de controle da plataforma de hospedagem. **Não envie seu arquivo `.env` para o repositório!**

---
