import { getRoomsQuery } from "./gql";
export const getRooms = async (user) => {
  const resp = await fetch("/api/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      "Content-Type": "application/json",
    },
    body: getRoomsQuery(),
  });
  const data = await resp.json();
  return data.data;
};
