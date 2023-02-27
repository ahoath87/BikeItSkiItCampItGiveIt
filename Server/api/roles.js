const express = require('express');

const {
  createRoles,
  getAllRoles,
  getRoleById,
  updateRoles,
  getRoleByCode,
  getRoleByName,
  getRoleByActive,
  getUserByRoleId,
  getRoleIdByUserId,
} = require('../db');
const { requireUser } = require('./utils');
const rolesRouter = express.Router();

// GET /api/roles

rolesRouter.get('/', async (req, res, next) => {
  try {
    const roles = await getAllRoles();
    res.send(roles);
  } catch (error) {
    next(error);
  }
});

rolesRouter.get('/:roleId', requireUser, async (req, res, next) => {
  let id = req.params.roleId;
  try {
    if (req.user) {
      const roleById = await getRoleById(id);
      res.send(roleById);
    }
  } catch (error) {
    next(error);
  }
});

// rolesRouter.get('/:userId/role', requireUser, async (req, res, next) => {
//   let id = req.params.userId;
//   // console.log('These are the params', req.params.userId);
//   try {
//     if (req.user) {
//       const roleId = await getRoleIdByUserId(id);
//       const role = await getRoleById(roleId);
//       res.send(role);
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// POST /api/role

rolesRouter.post('/', requireUser, async (req, res, next) => {
  const { description, createdOn } = req.body;
  if (req.user);
  {
    try {
      const newRole = await createRoles({
        description,
        createdOn,
      });

      res.send(newRole);
    } catch (error) {
      next(error);
    }
  }
});

//PATCH /api/roles/:roleId
rolesRouter.patch('/:roleId', requireUser, async (req, res, next) => {
  const { rolename, rolecode, description, active } = req.body;

  const id = req.params.roleId;

  try {
    const ogRole = await getRoleById(id);

    if (!ogRole) {
      next({
        error: 'error',
        name: 'NoRoleFoundError',
        message: `Role ${id} not found`,
      });
    } else {
      const updatedRole = await updateRoles(id, {
        rolename,
        rolecode,
        description,
        active,
      });

      res.send(updatedRole);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = rolesRouter;
