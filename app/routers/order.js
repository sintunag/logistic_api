// npm packages
const express = require('express');

// app imports
const {
  orderHandler
} = require('../handlers');

// globals
const router = new express.Router();
const {
  createOrder,
  updateOrder
} = orderHandler;

/* All the Orders Route */
router
  .route('')
  .post(createOrder);

/* Single Order by Id Route */
router
  .route('/:id')
  .put(updateOrder);

module.exports = router;
