const BASE_API = `http://localhost:8080/api`;

export const fetchAllLocations = async () => {
  try {
    const response = await fetch(`${BASE_API}/locations`);
    const results = await response.json();
    console.log('THESE ARE ALL THE LOCATIONS IN THE API CALL', results);
    return results;
  } catch (error) {
    console.error(error);
  }
};
