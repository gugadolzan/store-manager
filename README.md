# Projeto Store Manager

## Contexto

Este projeto trata-se de uma API utilizando a arquitetura MSC!

A API trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.

## Tecnologias usadas

- Node.js
- Express.js
- MySQL
- Mocha
- Chai
- Sinon

## Instalando dependências

```bash
npm install
```

## Executando aplicação

1. Certifique-se de que o MySQL server está rodando.

2. Execute a query presente no arquivo `StoreManager.sql` para criar o banco de dados no MySQL.

3. Altere o nome do arquivo `.env.example` para `.env` e adicione as informações de conexão com o banco de dados.

4. Execute o comando:

```bash
npm start
```

## Executando testes

```bash
npm run test:mocha
```
