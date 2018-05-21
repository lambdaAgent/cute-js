/** example: 
* const obj = { one, two, three: ['three'], four:{ four: true } };
* const newObj = deepCloneObject(obj);
* console.log(newObj) //{ one, two, three: ['three'], four:{ four: true } };
*/

exports.deepCloneObject = function deepCloneObject(obj, options) {
  const excludeKey = options && options.excludeKey;
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  let temp = {}; // give temp the original obj's constructor
  temp.__proto__ = obj.__proto__;
  for (let key in obj) {
    if(excludeKey && key === excludeKey){
      temp[key] = temp[key];
      continue;
    }
    temp[key] = deepCloneObject(obj[key]);
  }
  return temp;
}