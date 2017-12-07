const { deepCloneObject } = require('../index.js');
const { expect } = require('chai');


describe("deepCloneObject", function() {
  it("should clone the person object", function(){

		const person = {
			name: 'Joe',
			age: 23,
			address: {
				street: 'Somewhere drv, 23',
				postalCode: 11520,
				geoLocation: {
					lat: '-6.12313',
					lon: '108.23423'
				}
			}
		};

		const newPerson = deepCloneObject(person);

		expect(newPerson).to.have.a.property('name', 'Joe');
		expect(newPerson.address).to.have.a.property('postalCode', 11520);
	});
});

