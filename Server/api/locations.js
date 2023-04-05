const express = require('express');
const { requireUser } = require('./utils');
const { getAllLocations } = require('../db/locations');
const locationsRouter = express.Router();

locationsRouter.get('/', async (req, res, next) => {
  try {
    const locations = await getAllLocations();
    res.send(locations);
  } catch (error) {
    next(error);
  }
});

module.exports = locationsRouter;
