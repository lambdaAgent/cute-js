const { handleFailure } = require('./handleFailure');

/**
 * example:
 * const obj = { one, two, three: ['three'], four:{ four: true }, address: {postalCode: 12345} };
 * const postalCode = recursivelyGetProperties(obj, 'address.postalCode')
 */

exports.recursivelyGetProperties = function recursivelyGetProperties(obj, address){
  if (!address) return obj;
  if (address.indexOf('.') < 0) {
    handleFailure(obj, address);
    return obj[address];
  }
  const addressArray = address.split('.');
  const headAddress = addressArray[0];
  const tailAddress = addressArray.slice(1).join('.');
  
  handleFailure(obj, headAddress);
  const memoizedObj = obj[headAddress];
  return recursivelyGetValue(memoizedObj, tailAddress);
}

