export const getRoomsQuery = () => {
  const query = {
    query: `query GetRooms() {
        rooms {
          name
          id
          slug
        }
      }`,
  };
  return JSON.stringify(query);
};
export const getRoomQuery = (slug) => {
  const query = {
    query: `query GetRoom($slug:String) {
        room(where:{slug:$slug}) {
          id
          name
          question {
            id
            question
            details
            createdAt
            answer {
              answer
              id
              createdAt
              person {
                fullName
              }
            }
            person {
              fullName
            }
          }
        }
      }`,
    variables: {
      slug,
    },
  };
  return JSON.stringify(query);
};
export const getAddAnswerQuery = (user, answer, questionID) => {
  const query = {
    query: `mutation AddAnswer($answer:String!, $userID:String!, $questionID:ID!){
        createAnswer(data: 
          {
            answer:$answer, 
            person:{ connect: { userID: $userID } }
            question:{ connect: { id: $questionID } }
          }
        ) {
            answer
            id
            createdAt
            person {
              fullName
            }
        }
      }`,
    variables: {
      answer,
      userID: user.id,
      questionID,
    },
  };
  return JSON.stringify(query);
};
