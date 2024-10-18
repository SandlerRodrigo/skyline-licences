
# Skyline Licences API

## Descrição

Este é um projeto de API para autenticação de licenças de software. A licença está atrelada a um único dispositivo, identificado pelo endereço MAC da máquina, e possui uma data de expiração. Esta API permite:
- Criar uma nova licença.
- Cancelar ou ativar licenças existentes.
- Consultar o status de uma licença com base no endereço MAC.

## Funcionalidades Principais

- **Criação de Licenças**: Atribui uma licença a um dispositivo específico usando seu endereço MAC e chave.
- **Consulta de Licenças**: Verifica a validade de uma licença usando o endereço MAC.
- **Ativação/Cancelamento**: Ativa ou cancela licenças, alterando o campo de validade.

## Tecnologias Utilizadas

- **Node.js** com **NestJS** para a API backend.
- **PostgreSQL** como banco de dados relacional.
- **TypeORM** para mapeamento objeto-relacional (ORM).
- **dotenv** para gestão de variáveis de ambiente.

## Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

- **Node.js** (versão 14.x ou superior)
- **PostgreSQL** (versão 12.x ou superior)
- **Git** para clonar o repositório

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/skyline-licences.git
cd skyline-licences
```

### 2. Instale as dependências

Instale todas as dependências do projeto com o seguinte comando:

```bash
npm install
```

### 3. Configuração do Banco de Dados

Este projeto utiliza o PostgreSQL. Você precisará criar uma base de dados localmente ou utilizar um serviço de hospedagem de banco de dados como o Neon, AWS RDS ou outro. Neon é MUITO fácil de configurar Chico vai lá seu preguiçoso.

#### 3.1. Criar o Banco de Dados

No seu PostgreSQL, crie o banco de dados:

```sql
CREATE DATABASE skyline_licences;
```

#### 3.2. Configuração da Tabela

Crie a tabela `licenca` dentro do banco de dados. Use a seguinte query SQL:

```sql
CREATE TABLE licenca (
    id SERIAL PRIMARY KEY,
    chave VARCHAR(255) UNIQUE NOT NULL,
    mac_address VARCHAR(17) UNIQUE NOT NULL,
    validade BOOLEAN DEFAULT TRUE,
    data_expiracao TIMESTAMP NOT NULL
);
```

#### 3.3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
DATABASE_HOST=seu-host
DATABASE_PORT=5432
DATABASE_USERNAME=seu-usuario
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=skyline_licences
```

Altere os valores acima de acordo com as suas credenciais do PostgreSQL.

### 4. Compilação e Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run start
```

Isso iniciará o servidor na porta `3000` por padrão.

## Rotas da API

### 1. Criar uma Licença

- **Rota**: `POST /licencas`
- **O que espera (JSON)**:
  - `chave`: String (obrigatório)
  - `mac_address`: String no formato `XX:XX:XX:XX:XX:XX` (obrigatório)
  - `data_expiracao`: Data no formato ISO (obrigatório)
  
- **O que responde**:
  - Em caso de sucesso: Detalhes da licença criada.
  - Em caso de erro: Mensagem de erro apropriada.

### 2. Consultar uma Licença por MAC Address

- **Rota**: `GET /licencas/:mac_address`
- **O que espera**:
  - `mac_address`: O endereço MAC da licença (obrigatório)

- **O que responde**:
  - Em caso de sucesso: Detalhes da licença correspondente.
  - Em caso de erro: Mensagem de erro apropriada ou "Licença não encontrada".

### 3. Cancelar uma Licença

- **Rota**: `PATCH /licencas/cancelar/:mac_address`
- **O que espera**:
  - `mac_address`: O endereço MAC da licença a ser cancelada (obrigatório)

- **O que responde**:
  - Em caso de sucesso: Mensagem de sucesso e detalhes da licença cancelada.
  - Em caso de erro: Mensagem de erro apropriada.

### 4. Ativar uma Licença

- **Rota**: `PATCH /licencas/ativar/:mac_address`
- **O que espera**:
  - `mac_address`: O endereço MAC da licença a ser ativada (obrigatório)

- **O que responde**:
  - Em caso de sucesso: Mensagem de sucesso e detalhes da licença ativada.
  - Em caso de erro: Mensagem de erro apropriada.

## Testando as Rotas no Postman

Todas as rotas foram configuradas em um arquivo Postman para facilitar os testes. Você pode importar esse arquivo diretamente no Postman para testar as funcionalidades da API.

### Como usar:
1. Baixe o arquivo JSON para o Postman.
2. No Postman, vá até **File > Import** e selecione o arquivo baixado.
3. Todas as rotas estarão disponíveis para testes.

[Baixar arquivo Postman](./SkylineLicences.postman_collection.json)

## Estrutura do Projeto

O projeto segue uma estrutura modularizada no NestJS. Aqui está um resumo das principais pastas e arquivos:

```
skyline-licences/
├── src/
│   ├── app.module.ts           # Módulo raiz do projeto
│   ├── licenca/
│   │   ├── licenca.controller.ts  # Controlador das rotas de licença
│   │   ├── licenca.service.ts     # Lógica de negócios das licenças
│   │   ├── licenca.entity.ts      # Definição da entidade Licença
│   │   └── licenca.module.ts      # Módulo da Licença
├── .env                         # Arquivo de configuração de variáveis de ambiente
├── package.json                 # Dependências e scripts do projeto
├── README.md                    # Documentação do projeto
```
