const client = require('./client');

async function createRoles({ description, createdOn }) {
  try {
    const {
      rows: [role],
    } = await client.query(
      `
            INSERT INTO roles ( description, createdOn)
            VALUES ($1, $2 )
            RETURNING *;
            `,
      [description, createdOn]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getAllRoles() {
  try {
    const { rows: role } = await client.query(
      `
          SELECT * FROM roles;
        `
    );
    return role;
  } catch (error) {
    console.log('error gettingAllRoles');
    throw error;
  }
}

async function getRoleById(id) {
  try {
    const { rows: role } = await client.query(
      `
        SELECT *
        FROM roles
        WHERE id = ${id};
        `
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getRoleByCode(roleCode) {
  try {
    const { rows: role } = await client.query(
      `
        SELECT *
        FROM roles
        WHERE rolecode = $1;
        `,
      [roleCode]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getRoleByName(roleName) {
  try {
    const { rows: role } = await client.query(
      `
          SELECT *
          FROM roles
          WHERE rolename = $1;
          `,
      [roleName]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getRoleByActive(active) {
  try {
    const { rows: role } = await client.query(
      `
          SELECT *
          FROM roles
          WHERE active = $1;
          `,
      [active]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getUserByRoleId(id) {
  try {
    const { rows: role } = await client.query(
      `
            SELECT users.*
            FROM users
            JOIN userRoles ON userRoles."userId" = users.id
            WHERE userRoles."roleId" = $1
            `,
      [id]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function updateRoles(id, { ...fields }) {
  console.log('id:', id, 'update fields:', fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [role],
    } = await client.query(
      `
      UPDATE roles
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,

      Object.values(fields)
    );
    console.log('These are my updated roles: ', role);
    return role;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoles,
  getAllRoles,
  getRoleById,
  getRoleByCode,
  getRoleByName,
  getRoleByActive,
  getUserByRoleId,
  updateRoles,
};
