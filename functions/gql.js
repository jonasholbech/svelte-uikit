require("isomorphic-fetch");
require("dotenv").config();

const API_ENDPOINT =
  "https://api-eu-central-1.graphcms.com/v2/ckwckxtiv4la701z29z5k69iq/master";
const token = process.env.GRAPH_TOKEN;

exports.handler = async (event, context) => {
  //TODO: auth
  console.log(context);
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: event.body,
    });
    const data = await response.json();
    console.log(data);
    return { statusCode: 200, body: JSON.stringify({ data: data.data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
