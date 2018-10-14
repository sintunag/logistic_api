// npm packages
const {
  validate
} = require('jsonschema');
const mongoose = require('mongoose');
// app imports
const {
  Order
} = require('../models');
const {
  APIError
} = require('../helpers');
const {
  orderNewSchema,
  orderUpdateSchema
} = require('../schemas');
var distance = require('google-distance');
// google distance api key
const {
  GOOGLE_KEY
} = require('../config');
// set api key in api instance
distance.apiKey = GOOGLE_KEY;

/**
 * Validate the POST request body and create a new Order
 */
async function createOrder(request, response, next) {
  const validation = validate(request.body, orderNewSchema);
  if (!validation.valid) {
    return response.status(500).json({
      error: "REQUEST FORMAT IS NOT CORRECT"
    });
  }

  try {
    const totalDistance = await getDistance(request);
    const orderData = {
      id: mongoose.Types.ObjectId(),
      distance: totalDistance.distance,
      status: "UNASSIGN",
      origin: request.body.origin,
      destination: request.body.destination
    }

    const newOrder = await Order.createOrder(new Order(orderData));
    return response.status(200).json({
      id: newOrder.id,
      distance: newOrder.distance,
      status: newOrder.status
    });
  } catch (err) {
    return response.status(500).json({
      error: err.message
    });
  }
}

/**
 * Update a single order
 */
async function updateOrder(request, response, next) {
  const {
    id
  } = request.params;

  const validation = validate(request.body, orderUpdateSchema);
  if (!validation.valid) {
    return response.status(500).json({
      error: "REQUEST FORMAT IS NOT CORRECT"
    });
  }

  try {
    const order = await Order.updateOrder(id, request.body);

    if (order === 404) {
      return response.status(404).json({
        status: "ORDER_NOT_FOUND"
      });
    } else if (order === 500) {
      return response.status(500).json({
        status: "ISSUE_IN_UPDATION"
      });
    } else if (order === 409) {
      return response.status(409).json({
        status: "ORDER_ALREADY_BEEN_TAKEN"
      });
    } else if (order.ok === 1) {
      return response.status(200).json({
        status: "SUCCESS"
      });
    }

  } catch (err) {
    return response.status(500).json({
      status: "ISSUE_IN_UPDATION"
    });
  }
}

/**
 * Returning distance value from api
 */
async function getDistance(request, response, next) {
  return new Promise((resolve, reject) => {
    distance.get({
        index: 1,
        origin: request.body.origin.toString(),
        destination: request.body.destination.toString()
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
  });
}

module.exports = {
  createOrder,
  updateOrder
};
