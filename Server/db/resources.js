const client = require('./client');

async function createResources({ website, description, locationId }) {
  try {
    const {
      rows: [resources],
    } = await client.query(
      `     
              INSERT INTO resources( website, description, "locationId")
              VALUES ( $1, $2, $3)
              RETURNING *;
              `,
      [website, description, locationId]
    );
    console.log('first create resources ', resources);

    return resources;
  } catch (error) {
    console.error('this is error in createResources', error);
    throw error;
  }
}

module.exports = {
  createResources,
};
