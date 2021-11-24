export const getRoomsQuery = () => {
  const query = {
    query: `query GetRooms() {
        rooms {
          name
          id
        }
      }`,
  };
  return JSON.stringify(query);
};
