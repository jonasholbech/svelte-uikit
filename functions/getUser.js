require("isomorphic-fetch");
require("dotenv").config();

const API_ENDPOINT =
  "https://api-eu-central-1.graphcms.com/v2/ckwckxtiv4la701z29z5k69iq/master";
const token = process.env.GRAPH_TOKEN;

exports.handler = async (event, context) => {
  const user = context.clientContext.user;
  const query = {
    query: `query MyQuery($userID:String) {
person(where:{userID:$userID}) {
  fullName
}
}`,
    variables: {
      userID: user.sub,
    },
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    if (!data.data.person?.fullName) {
      //user does not exist in DB, create them
      const CREATE_PERSON_QUERY = {
        query: `mutation AddPerson($userID:String!, $fullName:String!) {
          createPerson (data: {
            fullName:$fullName, userID:$userID
          }) {
            fullName
          }
        }`,
        variables: {
          fullName: user.user_metadata.full_name,
          userID: user.sub,
        },
      };
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(CREATE_PERSON_QUERY),
      });
      const data = await response.json();

      return { statusCode: 200, body: JSON.stringify({ firstVisit: true }) };
    } else {
      return { statusCode: 200, body: JSON.stringify({ firstVisit: false }) };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
