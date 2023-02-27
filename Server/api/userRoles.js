const express = require('express');
const {
  createUserRoles,
  getAllUserRoles,
  getRoleById,
  getUserRoleById,
  updateUserRoles,
  getFullRoleByUserId,
} = require('../db');

const { requireUser } = require('./utils');
const userRolesRouter = express.Router();

// GET /api/userRoles

userRolesRouter.get('/', async (req, res, next) => {
  try {
    const userRoles = await getAllUserRoles();
    res.send(userRoles);
  } catch (error) {
    next(error);
  }
});

userRolesRouter.get('/:userId/role', requireUser, async (req, res, next) => {
  let id = req.params.userId;
  console.log('These are the params', req.params.userId);
  try {
    if (req.user) {
      const role = await getFullRoleByUserId(id);
      res.send(role);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/userRole

userRolesRouter.post('/', requireUser, async (req, res, next) => {
  const { userId, roleId } = req.body;
  if (req.user);
  {
    try {
      const newUserRole = await createUserRoles({
        userId,
        roleId,
      });

      res.send(newUserRole);
    } catch (error) {
      next(error);
    }
  }
});

//PATCH /api/roles/:roleId
userRolesRouter.patch('/:userRoleId', requireUser, async (req, res, next) => {
  const { roleId } = req.body;

  const id = req.params.userRoleId;

  try {
    const ogUserRole = await getUserRoleById(id);

    if (!ogUserRole) {
      next({
        error: 'error',
        name: 'NoUserRoleFoundError',
        message: `UserRole ${id} not found`,
      });
    } else {
      const updatedUserRole = await updateUserRoles(id, {
        roleId,
      });

      res.send(updatedUserRole);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRolesRouter;
