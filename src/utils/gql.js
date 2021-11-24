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
