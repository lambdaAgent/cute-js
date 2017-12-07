
/**
 * Warning, this function mutate object, combine it with deepCloneObject for immutability
 * example:
 * const obj = { one, two, three: ['three'], four:{ four: true }, address: {postalCode: 12345} };
 * const postalCode = recursiveAssignObject(obj, 'address.postalCode', 'hello');
 * console.log(postalCode.address.postalCode) // 'hello'
 */
exports.recursiveAssignObject = function recursiveAssignObject(object, path, value) {
  function recursive(object, value, path){
    const pathArray = path.split('.');
    if (pathArray.length <= 1){
      object[path] = value;
      return object
    }

    const nextObject = object[pathArray[0]];
    const nextPath = pathArray.slice(1).join('.');
    return recursive(nextObject, value, nextPath)
  }

  recursive(object, value, path);
  return object;
}
