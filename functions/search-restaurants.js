const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function findRestaurantsByTheme(theme, count) {
  const req = {
    TableName: process.env.restaurants_table,
    Limit: count,
    FilterExpression: "contains(themes, :theme)",
    ExpressionAttributeValues: { ":theme": theme }
  };

  const results = await dynamodb.scan(req).promise();

  return results.Items;
}

module.exports.handler = async event => {
  const req = JSON.parse(event.body);

  const restaurants = await findRestaurantsByTheme(req.theme, 8);

  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  };

  return response;
};
