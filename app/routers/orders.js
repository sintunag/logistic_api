// npm packages
const express = require('express');

// app imports
const {
  ordersHandler
} = require('../handlers');

// globals
const router = new express.Router();
const {
  readOrders
} = ordersHandler;

/* All the Orders Route */
router
  .route('')
  .get(readOrders)

module.exports = router;
