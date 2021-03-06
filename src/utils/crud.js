import {
  getRoomsQuery,
  getRoomQuery,
  getAddAnswerQuery,
  getAddQuestionQuery,
  deleteAnswerQuery,
  deleteQuestionQuery,
} from "./gql";
export const getRooms = async (user) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    body: getRoomsQuery(),
  });
  const data = await resp.json();
  return data.data;
};
export const getRoomData = async (user, slug) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    body: getRoomQuery(slug),
  });
  const data = await resp.json();
  return data.data;
};
export const addAnswer = async (user, answer, questionID) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: getAddAnswerQuery(user, answer, questionID),
  });
  const data = await resp.json();
  return data.data;
};
export const addQuestion = async (user, question, details, roomID) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: getAddQuestionQuery(user, question, details, roomID),
  });
  const data = await resp.json();
  return data.data;
};
export const deleteAnswer = async (user, answerID) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: deleteAnswerQuery(answerID),
  });
  const data = await resp.json();
  return data.data;
};
export const deleteQuestion = async (user, questionID) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: deleteQuestionQuery(questionID),
  });
  const data = await resp.json();
  return data.data;
};
