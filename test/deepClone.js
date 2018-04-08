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

		function Car (model, year){
			this.model = model;
			this.year = year;
		}

		const _car = new Car('Chevy',1991);
		console.log(_car.__proto__);
		const newCar = deepCloneObject(_car);
		const newPerson = deepCloneObject(person);
		console.log('type', newCar instanceof Car);
		console.log(newPerson);
		expect(newPerson).to.have.a.property('name', 'Joe');
		expect(newPerson.address).to.have.a.property('postalCode', 11520);
		expect(newCar).to.have.a.property('model', 'Chevy');
		expect(newCar instanceof Car).to.be.true 
	});		
});

