const APIError = require('./APIError');
/**
 * Validate the 'limit' and `skip` query params
 * @param {String} val - limit or skip param
 * @param {Number} max - the max value (default 1000)
 * @param {String} type - what we're validating (skip or limit, default limit)
 * @return {Number} numerical form of the val
 */
function parsePageLimit(val, type = 'limit') {
  if (!val) {
    return null;
  }
  const num = +val;
  const min = 1;

  if (!Number.isInteger(num)) {
    return new APIError(
      500,
      `Invalid ${type}: '${val}', ${type} needs to be an integer.`
    );
  } else if (num < min) {
    return new APIError(
      500,
      `number should be equal or greater than ${min}`
    );
  }
  return num;
}

module.exports = parsePageLimit;
