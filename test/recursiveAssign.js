const { recursiveAssignObject } = require('../index');
const { expect } = require('chai');

describe("recursiveAssign", function() {
  it("should assign value to object based on fact", function(){

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

		recursiveAssignObject(person, 'address.geoLocation.lat', '0');

		expect(person.address.geoLocation).to.have.a.property('lat', '0');
	});

	it("should throw error with the path", function(){

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

		recursiveAssignObject(person, 'address.geoLocation.aasdf.asdf', '0');
		expect(person.address.geoLocation.aasdf).to.throw(Error);

	});
});

