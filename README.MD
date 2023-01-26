<div align="center">
<h1  align="center">API CRUD SERVERLESS COM API GATEWAY, AWS LAMBDA E DYNAMODB</h1>
</div>

## :package: Badge Stack
<div align="center"> 
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?logo=Amazon%20DynamoDB&logoColor=white&style=for-the-badge" alt="Git badge"/>
<img src="https://img.shields.io/badge/Amazon%20API%20Gateway-FF4F8B.svg?style=for-the-badge&logo=Amazon-API-Gateway&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/AWS%20Lambda-FF9900.svg?style=for-the-badge&logo=AWS-Lambda&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="Git badge"/> 
<img src="https://img.shields.io/badge/JSON-000000.svg?style=for-the-badge&logo=JSON&logoColor=white" alt="Git badge"/> 
<img src="https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white" alt="Git badge"/> 
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git badge"/> 
<img src="https://img.shields.io/badge/GitKraken-179287.svg?style=for-the-badge&logo=GitKraken&logoColor=white" alt="Github Badge"/> 
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge"/> 
</div> 

## :chart_with_upwards_trend: Diagrama do projeto
<div align="center"> <img src="https://github.com/walterowisk/CRUD-APIGateway-Lambda-DynamoDB/blob/main/img/aws-diagram.png" alt="AWS Diagram" width="300"> </div> 

## :cloud: Serviços AWS

 - **API GATEWAY:** Serviço gerenciado que permite criação, publicação, manutenção, monitoramento e proteção de APIs REST e WebSocket em qualquer escala. [Saiba mais.](https://aws.amazon.com/pt/api-gateway/)
 - **LAMBDA:** Serviço de computação sem servidor e orientado a eventos que permite executar código para praticamente qualquer tipo de aplicação ou serviço de backend sem provisionar ou gerenciar servidores. [Saiba mais.](https://aws.amazon.com/pt/lambda/)
 - **DYNAMODB:** Banco de dados de chave-valor NoSQL, sem servidor e totalmente gerenciado, projetado para executar aplicações de alta performance em qualquer escala. [Saiba mais.](https://aws.amazon.com/pt/dynamodb/) 

## :page_facing_up: Descrição do projeto


Criação de uma API CRUD serverless usando API Gateway, Lambda e DynamoDB. Essa API cria, lê, atualiza e exclui itens de uma tabela por meio de requisições feitas através do Postman.

Basicamente o fluxo do projeto consiste na criação de uma tabela no DynamoDB. Em seguida, cria-se uma função Lambda e logo depois cria-se uma API HTTP usando API Gateway. Para finalizar são realizados os testes invocando a API que por sua vez solicita a função do Lambda que interage com o DynamoDB. A tabela  responde ao API Gateway que retorna o resultado ao Postman.

É interessante ressaltar que a API é executada de forma serverless, portanto, não há gerenciamento da infraestrutura e o sistema escala automaticamente.

## Mão no console
Todas as etapas deste projeto foram feitas diretamente no AWS Management Console. 

> Todos os nomes `marcados como código` foram dados por mim e, portanto, ficam a critério de quem estiver reproduzindo o projeto.

Sem mais enrolação, let's go!!

### 1. Criação de tabela no DynamoDB
Tabela para armazenar os dados enviados pelo Postman. Partition key recomendada com o tipo *number* ou *string*.

 - Abrir o console serviço DynamoDB.
 - Clicar em ***Create Table***.
 - Em ***Table name*** inserir `crud-lab`.
 - Em ***Partition key*** inserir `id` .
 - Rolar a página até o fonal e clicar em ***Create table***.

### 2. Criação de uma função Lambda
A documentação da AWS recomenda  a criação de funções separadas para cada rota, mas neste projeto será utilizada uma única função Lambda.
 - Dentro do console do Lambda clicar em ***Create function***.
 - Deixar selecionada a opção ***Author from scratch*** para criar uma função do zero.
 - Em ***Function name*** inserir `crud-lab-lambda`.
 - Em ***Runtime*** selecionar *Node.js* na versão de sua preferência.
 - Deixar a opção Architecture em *x86_64*.
 - Em ***Permissions*** clicar em **Change default execution role** e marcar a opção *Create a new role from AWS policy templates*.
 - No campo ***Role name*** inserir `crud-lab-role`.
 - Em ***Policy templates*** marcar a opção *Simple microservice permissions* para que a função Lambda tenha permissão de se comunicar com o DynamoDB.
 - Clicar em ***Create function***.
 - Na tela a seguir clicar no editor de código do console e substiuir o script de teste pelo seu código. 

> :bulb: Caso utilize o arquivo `index.js` anexado a este repositório não esqueça de ajustar o nome da tabela se necessário for.

 - Depois de inserir o código *index.js* clicar em ***Deploy***.

### 3. Criação da API HTTP
Será criada inicialmente uma API vazia para depois configurar as rotas e integrações com a função Lambda. Essa API fornecerá um endpoint HTTP.

 - Entrar no console do API Gateway e clicar em ***Create API***.
 - Selecionar ***HTTP API*** e clicar em ***Build***.
 - No campo ***API name*** inserir `crud-lab-api` e clicar em ***Next***.
 - Na tela ***Configure routes*** clicar em ***Next***.
 - Na tela ***Define stages*** deixar com o nome *$default* e clicar em ***Next***.
 - Na tela ***Review and create*** clicar em ***Create***.

### 4. Criação das rotas
Serão criadas quatro rotas para envio de solicitações de API para o backend da aplicação, papel desempenhado pela função Lambda. Está anexado a este repositório o arquivo `.json` da collection exportada do Postman para enventuais consultas.
As rotas são as seguintes:
-   `PUT /items`
-   `GET /items`
-   `GET /items/{id}`
-   `DELETE /items/{id}`

Para criar as rotas basta executar os passos a seguir:

 - Dentro do console do ***API Gateway*** selecionar a API `crud-lab-api` criada anteriormente.
 -  Na barra lateral direita da tela clicar em ***Routes*** e na tela seguinte clicar em ***Create*** .
 - Ao entrar na tela ***Create a route*** na função ***Route and method*** selecionar o método `PUT` e logo ao lado do método inserir o caminho `/items`  e em seguida clicar em ***Create***.
 - Repetir o mesmo procedimento para a rota `GET /items`.
 - A rota seguinte é a `GET /items/{id}`. Atentar para o caminho com o parâmetro `/{id}` no final.
 - A última rota é a `DELETE /items/{id}`
 
 <div align="center"> <img src="https://github.com/walterowisk/CRUD-APIGateway-Lambda-DynamoDB/blob/main/img/routes.png" alt="API Routes" width="300"> </div> 

### 5. Criar a integração
Conectar as rotas criadas com o Lambda.

 - Dentro do console da API criada clicar em ***Integrations*** na barra lateral direita.
 - Em seguida clicar na na aba ***Manage integrations*** e depois em ***Create***.
 - Na tela ***Create an integration*** ir direto para a opção ***Integration target/Integration type*** selecionar a opção *Lambda function* 
- Mais abaixo, em ***Lambda Function*** selecionar `crud-lab-lambda`e a seguir clicar em ***Create***.

### 6. Anexar a integração com as rotas
Será utilizada a mesma integração para todas as rotas.

 - Dentro da tela ***Integrations*** da API clique na aba ***Attach integrations to routes***.
 - Clicar em uma das rotas (PUT/GET/DELETE/GET) e logo ao lado clicar no campo ***Choose an existing integration***.
 - Selecionar a opção `crud-lab-lambda` e clicar em ***Attach integration***.
 - Repetir essa integração para todas as rotas.

Após realizar todas as integrações as rotas ficarão de acordo com a imagem. Com esse passo conluído já é possível realizar os testes de API.

<div align="center"> <img src="https://github.com/walterowisk/CRUD-APIGateway-Lambda-DynamoDB/blob/main/img/integrations.png" alt="Integrations" width="300"> </div> 

### 7. Testar a API
Conforme já mencionado os testes foram feitos com o Postman, um API Client muito popular entre os desenvolvedores.

 - **Criar ou atualizar um item (`PUT /items`):**
 Endpoint: https://491xm45qxb.execute-api.us-east-1.amazonaws.com/items
 Corpo: `{"id": "123", "price": 178, "name": "tenis nike"}`
 Retorno: `"Item adicionado: 123"`
 
 - **Solicitar todos os itens (`GET /items`):**
  Endpoint: https://491xm45qxb.execute-api.us-east-1.amazonaws.com/items
  Retorno:
  ```json
{
    "Items": [
        {
            "price": 178,
            "id": "123",
            "name": "tenis nike"
        }
    ],
    "Count": 1,
    "ScannedCount": 1
}
```
 - **Solicitar um item específico (`GET /items/{id}`):**
Endpoint: https://491xm45qxb.execute-api.us-east-1.amazonaws.com/items/123
Retorno:
```json
{
    "Item": {
        "price": 178,
        "id": "123",
        "name": "tenis nike"
    }
}
```
 - **Excluir um item específico (`DELETE /items/{id}`):**
Endpoint: https://491xm45qxb.execute-api.us-east-1.amazonaws.com/items/123
Retorno: `"Item deletado: 123"`

### Gif preview
 <div align="center"> <img src="https://github.com/walterowisk/CRUD-APIGateway-Lambda-DynamoDB/blob/main/img/crud-api-postman.gif" alt="Gif Test API Postman" width="300"> </div> 