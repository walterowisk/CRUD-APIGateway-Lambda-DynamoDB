const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    console.info("event data: " + JSON.stringify(event));

    switch (event.httpMethod + " " + event.resource) {
      //Deletar item único pelo ID
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "crud-demo",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      //Exibir item único pelo ID
      case "GET /items/{id}":
        body = await dynamo
          .get({
            TableName: "crud-demo",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;

      //Exibir lista de itens da tabela
      case "GET /items":
        body = await dynamo.scan({ TableName: "crud-demo" }).promise();
        break;

      //Adicionar ou atualizar item da tabela
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "crud-demo",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name,
            },
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;

      //Se a rota não for encontrada
      default:
        throw new Error(
          `Unsupported route: "${
            event.httpMethod +
            " " +
            event.resource +
            " - EVENT: " +
            JSON.stringify(event)
          }"`
        );
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
