// handleFailure = obj:Obj{Any} -> address:String
exports.handleFailure = function(obj, address){
  if (!obj.hasOwnProperty(address)) {
    console.error('obj: ', obj);
    console.error('address: ', address);
    throw new Error('fail to get ' + address + ' at object: ' + JSON.stringify(obj));
  }
}
