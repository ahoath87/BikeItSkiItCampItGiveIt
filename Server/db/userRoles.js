const client = require('./client');

async function createUserRoles({ userId, roleId }) {
  try {
    const {
      rows: [role],
    } = await client.query(
      `
            INSERT INTO userRoles ("userId", "roleId")
            VALUES ($1, $2)
            RETURNING *;
            `,
      [userId, roleId]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function getAllUserRoles() {
  try {
    const { rows: role } = await client.query(
      `
          SELECT * FROM userRoles;
        `
    );
    return role;
  } catch (error) {
    console.log('error gettingAllUserRoles');
    throw error;
  }
}

async function getUserRoleById(id) {
  try {
    const { rows: userRole } = await client.query(
      `
        SELECT *
        FROM userRoles
        WHERE id = ${id};
        `
    );
    return userRole;
  } catch (error) {
    throw error;
  }
}

async function getFullRoleByUserId(id) {
  try {
    const { rows: role } = await client.query(
      `
              SELECT roles.*
              FROM roles
              JOIN userRoles ON userRoles."roleId" = roles.id
              WHERE userRoles."userId" = $1
              `,
      [id]
    );
    return role;
  } catch (error) {
    throw error;
  }
}

async function updateUserRoles(id, { ...fields }) {
  console.log('id:', id, 'update fields:', fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [userRole],
    } = await client.query(
      `
      UPDATE userRoles
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,

      Object.values(fields)
    );
    console.log('These are my updated Userroles: ', userRole);
    return userRole;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUserRoles,
  getAllUserRoles,
  getUserRoleById,
  updateUserRoles,
  getFullRoleByUserId,
};
