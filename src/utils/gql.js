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
                userID
              }
            }
            person {
              fullName
              userID
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
              userID
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

export const getAddQuestionQuery = (user, question, details, roomID) => {
  const query = {
    query: `mutation AddQuestion($question:String!, $details:String, $userID:String!, $roomID:ID!){
        createQuestion(data:{
          question:$question
          details:$details
          room: {connect:{id:$roomID}}
          person:{ connect: { userID: $userID } }
        }) {
         
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
                userID
            }
            }
            person {
            fullName
            userID
            }
                
        }
      }`,
    variables: {
      question,
      details,
      userID: user.id,
      roomID,
    },
  };
  return JSON.stringify(query);
};
