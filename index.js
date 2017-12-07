const { deepCloneObject } = require('./CommonUtilForObject/deepCloneObject');
const { recursiveAssignObject } = require('./CommonUtilForObject/recursiveAssignObject');
const { recursivelyGetProperties } = require('./CommonUtilForObject/recursivelyGetProperties');
const { createClickEvent } = require('./CommonUtilForDOM/createClickEvent');

module.exports = {
	createClickEvent,
	deepCloneObject,
	recursivelyGetProperties,
	recursiveAssignObject
}
