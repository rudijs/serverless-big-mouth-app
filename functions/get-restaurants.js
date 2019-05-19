const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getRestaurants(count) {
  const req = {
    TableName: process.env.restaurants_table,
    Limit: count
  };
  const results = await dynamodb.scan(req).promise();
  return results.Items;
}

module.exports.handler = async () => {
  const restaurants = await getRestaurants(8);
  console.log(101, restaurants);
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  };
  return response;
};
