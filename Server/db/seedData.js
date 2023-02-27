const client = require('./client');
require('dotenv').config();

const {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} = require('./users');

const {
  createRoles,
  getAllRoles,
  getRoleById,
  getRoleByCode,
  getRoleByName,
  getRoleByActive,
  getUserByRoleId,
} = require('./roles');

const {
  createUserRoles,
  getAllUserRoles,
  getFullRoleByUserId,
} = require('./userRoles');

const { createLocation } = require('./locations');

async function dropTables() {
  try {
    console.log('Dropping All Tables!..');

    await client.query(`
  
      DROP TABLE IF EXISTS locations;
      DROP TABLE IF EXISTS userRoles;
      DROP TABLE IF EXISTS roles;
      DROP TABLE IF EXISTS users;
     `);

    console.log('All Tables Dropped!..');
  } catch (error) {
    console.log('Error dropping tables!..');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          UNIQUE (username, email)
        );
        
  
        CREATE TABLE roles (
          id SERIAL PRIMARY KEY,
          rolename VARCHAR(255) DEFAULT 'user',
          rolecode VARCHAR(255) DEFAULT 2,
          description TEXT,
          createdOn DATE,
          active BOOLEAN DEFAULT true
        );
  
        CREATE TABLE userRoles (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "roleId" INTEGER REFERENCES roles(id)
        );

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            geolocation POINT NOT NULL,
            state VARCHAR(255)
        );
        `);

    console.log('All tables created!');
  } catch (error) {
    console.error('Error creating tables!');
    throw error;
  }
}

async function createFakeUsers() {
  try {
    console.log('Starting to create users...');
    const fakeUsers = [
      {
        name: 'Ashley Hoath',
        email: 'ashley@gmail.com',
        address: '3103 Great Neck Ct.',
        username: 'ashley1',
        password: 'ashley123',
      },
      {
        name: 'Megan Miller',
        email: 'megan@gmail.com',
        address: '6102 Fun Day Lane',
        username: 'megan1',
        password: 'megan123',
      },
    ];
    const users = await Promise.all(fakeUsers.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createFakeRoles() {
  try {
    const fakeRole = [
      {
        rolename: 'admin',
        rolecode: 2,
        description: 'admin can change stuff',
        createdOn: '2023-02-19',
      },
      {
        rolename: 'user',
        rolecode: 1,
        description: 'user sells and trades',
        createdOn: '2023-02-19',
      },
    ];
    const fakeRoles = await Promise.all(fakeRole.map(createRoles));
    console.log('roles created:');
    console.log(fakeRoles);
    console.log('Finished creating roles!');
  } catch (error) {
    console.error('Error creating roles!');
    throw error;
  }
}

async function createFakeUserRoles() {
  try {
    const fakeUserRole = [
      {
        userId: 1,
        roleId: 2,
      },
      {
        userId: 2,
        roleId: 1,
      },
    ];
    const fakeUserRoles = await Promise.all(fakeUserRole.map(createUserRoles));
    console.log('user roles created:');
    console.log(fakeUserRoles);
    console.log('Finished creating user roles!');
  } catch (error) {
    console.error('Error creating user roles!');
    throw error;
  }
}

async function createFakeLocation() {
  try {
    const fakeLocation = [
      {
        name: 'Longs Peak trailhead',
        geolocation: '-74.07867091 4.66455174',
        state: 'colorado',
      },
      {
        name: 'Hall Ranch TrailHead Bitterbrush',
        geolocation: '-74.07867091 4.66455174',
        state: 'colorado',
      },
    ];
    const fakeLocations = await Promise.all(fakeLocation.map(createLocation));
    console.log('locations created:');
    console.log(fakeLocations);
    console.log('Finished creating locations!');
  } catch (error) {
    console.error('Error creating locations!');
    throw error;
  }
}

async function testDB() {
  try {
    console.log('testing database!');

    // *******************USER TESTS******************//

    const userByUsername = await getUserByUsername('ashley1');
    console.log('testing getUserByUsername', userByUsername);

    const allUsers = await getAllUsers();
    console.log('These are all the users!', allUsers);

    const userById = await getUserById(1);
    console.log('testing getUserById', userById);

    const userByUser = await getUser('ashley1', 'ashley123');
    console.log('testing getUser', userByUser);

    const userByEmail = await getUserByEmail('ashley@gmail.com');
    console.log('testing getUserByemail', userByEmail);

    // const updatedUser = await updateUser(
    //   1,
    //   'sandy',
    //   'sandy@gmail.com',
    //   '2145 Happy Life Way',
    //   'rockstar',
    //   'lemons!'
    // );
    // console.log('testing updateUsers', updatedUser);

    //*******************gearPosts TESTS******************//

    //   console.log('starting to test gearPosts');
    //   const allGearPosts = await getAllGearPosts();
    //   console.log('testing getAllGearPosts', allGearPosts);

    //   const gearPostsByUser = await getGearPostByUser(2);
    //   console.log('testing getGearPostsByUser', gearPostsByUser);

    //   const gearPostById = await getGearPostById(1);
    //   console.log('testing getGearPostById', gearPostById);

    //   const gearPostsByDate = await getGearPostByDate('2023-02-05');
    //   console.log('testing getGearPostsByDate', gearPostsByDate);

    //   const gearPostByName = await getGearPostsByName('Old Hoodie');
    //   console.log('testing getGearPostByName', gearPostByName);

    //   const gearPostByActive = await getGearPostByActive(true);
    //   console.log('testing getGearPostByActive', gearPostByActive);

    //   const gearByUser = await getGearPostByUser(1);
    //   console.log('testing getGearPostByUSer', gearByUser);

    // const updatedGearPost = await updateGearPosts(allGearPosts[0].id, {
    //   title: 'Old shoes',
    //   location: 'longmont',
    //   description: 'running shoes',
    //   price: 10.0,
    //   condition: 'new',
    //   category: 'shoes',
    //   size: '8',
    //   updatedat: '2023-02-20',
    //   active: false,
    // });
    // console.log('testing update gear post at index 0', updatedGearPost);

    //******************* MESSAGES TESTS******************//
    //   const allMessages = await getAllMessages();
    //   console.log('testing getAllMessages', allMessages);

    //   const messageById = await getMessageById(2);
    //   console.log('testing getMessageById', messageById);

    //   const messageByPostId = await getMessageByPostId(1);
    //   console.log('testing getMessageByPostId', messageByPostId);

    //   const messageByCreatorId = await getMessageByCreatorId(1);
    //   console.log('testing getMessageByCreatorId', messageByCreatorId);

    //   const messageByActive = await getMessageByActive(true);
    //   console.log('testing getMessageByActive', messageByActive);

    //   const attachMessageToGear = await attachMessageToGearPost(allGearPosts);
    //   console.log('testing attach message to gear post:', attachMessageToGear);
    //   console.log(
    //     'these are all the gear posts w messages attached',
    //     attachMessageToGear[0]
    //   );

    //******************* ROLES TESTS******************//
    const allRoles = await getAllRoles();
    console.log('testing getAllRoles', allRoles);

    const roleById = await getRoleById(1);
    console.log('testing getRoleById', roleById);

    const roleByCode = await getRoleByCode(2);
    console.log('testing getRoleByCode', roleByCode);

    const roleByName = await getRoleByName('admin');
    console.log('testing getRoleByName', roleByName);

    const roleByActive = await getRoleByActive(true);
    console.log('testing getRoleByActive', roleByActive);

    const userByRoleId = await getUserByRoleId(2);
    console.log('testing getUserByRoleId', userByRoleId);

    const roleByUserId = await getFullRoleByUserId(1);
    console.log('testing getRoleByUSERId', roleByUserId);

    console.log('finished testing database!');
  } catch (error) {
    console.log('error testing db');
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createFakeUsers();
    await createFakeRoles();
    await createFakeUserRoles();
    await createFakeLocation();
    await testDB();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
