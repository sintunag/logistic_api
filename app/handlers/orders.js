// app imports
const {
  Order
} = require('../models');
const {
  parseSkipLimit
} = require('../helpers');

/**
 * List all the orders. Query params ?skip=0&limit=1000 by default
 */
async function readOrders(request, response, next) {
  /* pagination validation */
  let skip = parseSkipLimit(request.query.skip, null, 'skip') || 0;
  let limit = parseSkipLimit(request.query.limit, 1000, 'limit') || 1000;

  try {
    const orders = await Order.readOrders({}, {}, skip, limit);
    return response.json(orders);
  } catch (err) {
    return response.status(500).json({
      error: "SOMETHING_WENT_WRONG"
    });
  }
}

module.exports = {
  readOrders
};
