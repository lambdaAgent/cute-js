const { handleFailure } = require('./handleFailure');

/**
 * recursiveAssignObject = Obj{Any} -> path:String -> value:Any -> null
 * Warning, this function mutate object, combine it with deepCloneObject for immutability
 */

exports.recursiveAssignObject = function recursiveAssignObject(object, path, value) {
  if(!path) return obj;
  function recursive(object, value, path){
    const pathArray = path.split('.');
    if (pathArray.length <= 1){
      object[path] = value;
      return object
    }

    handleFailure(object, pathArray[0]);

    const nextObject = object[pathArray[0]];
    const nextPath = pathArray.slice(1).join('.');
    return recursive(nextObject, value, nextPath)
  }

  recursive(object, value, path);
  return object;
}