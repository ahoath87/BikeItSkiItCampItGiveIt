const client = require('./client');

async function createLocation({ geolocation }) {
  console.log('this is geolocation:', geolocation);
  console.log('starting to createLocation');
  try {
    const {
      rows: [location],
    } = await client.query(
      `     
            INSERT INTO locations( geolocation)
            VALUES ( ST_PointFromText('POINT(${geolocation})', 4326))
            RETURNING *;
            `
    );
    console.log('first create location ', location);

    return location;
  } catch (error) {
    console.error('this is error in createlocations', error);
    throw error;
  }
}

// transfers from WKB to coordinates while getting all locations
async function getAllLocations() {
  try {
    const { rows: location } = await client.query(`
      SELECT ST_AsText(geolocation)
      FROM locations
      `);
    console.log('These are our all our locationss :', location);
    return location;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createLocation,
  getAllLocations,
};
