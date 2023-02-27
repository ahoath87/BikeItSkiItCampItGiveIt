const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({ name, email, address, username, password }) {
  try {
    //if password is exactly this turn is admin to true

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, email, address, username, password)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username, email) DO NOTHING
        RETURNING *;
        `,
      [name, email, address, username, hashedPassword]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: user } = await client.query(
      `
      SELECT * FROM users;
    `
    );
    return user;
  } catch (error) {
    console.log('error gettingAllUsers');
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username = $1`,
      [username]
    );

    return user;
  } catch (error) {
    console.log('Error getting user by Username');
    throw error;
  }
}

async function getUser(username, password) {
  if (!username || !password) return;
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.error('Error getting user');
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT *
    FROM users
    WHERE id=${id}`);

    return user;
  } catch (error) {
    console.error('Error getting user by ID');
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email = $1
    `,
      [email]
    );

    return user;
  } catch (error) {
    console.error('Error getting user by eMail');
    throw error;
  }
}

async function updateUser(id, { name, email, address, username, password }) {
  console.log('id', id, 'use4rname to update:', username);
  const updatedHashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET name = $2, email = $3, address = $4, username = $5, password = $6
        WHERE id = $1
        RETURNING *
        `,
      [id, name, email, address, username, updatedHashedPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
};
