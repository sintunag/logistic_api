// app imports
const {
  Order
} = require('../models');
const {
  parsePageLimit
} = require('../helpers');

/**
 * List all the orders. Query params ?skip=0&limit=1000 by default
 */
async function readOrders(request, response, next) {
  /* pagination validation */
  let limit = parsePageLimit(request.query.limit, 'limit');
  let page = parsePageLimit(request.query.page, 'page');
  let skip = limit * (page - 1) || 0;

  if (typeof page !== 'number') {
    return next(page);
  } else if (typeof limit !== 'number') {
    return next(limit);
  }

  try {
    const orders = await Order.readOrders({}, {}, skip, limit);
    return response.json(orders);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  readOrders
};
