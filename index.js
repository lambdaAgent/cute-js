const deepCloneObject = require('./CommonUtilForObject/deepCloneObject');
const recursiveAssignObject = require('./CommonUtilForObject/recursiveAssignObject');
const recursiveGetProperties = require('./CommonUtilForObject/recursiveGetProperties');
const { createClickEvent } = require('./CommonUtilForDOM');

module.exports = {
	createClickEvent,
	deepClone,
	recursiveGetProperties,
	recursiveAssignObject
}
