This Library contains some common helpful tools that I use the most as web developer.

### 1.Deep Clone Object
This function will clone an object, a very simple and fast immutability function.

example: 
    
    import { deepCloneObject } from 'cute-js';        
    const obj = {
        name: 'Joe',
        age: 23,
        address: {
            street: 'somewhere drv, no.23',
            postalCode: '11520',
            geoLocation: {
              lat: -6.12314,
              lon: 108.123123
            }
        },
    }
    
    const newObj = deepCloneObject(obj);
    
    newObj.age = 5;
    newObj.postalCode = '1';

To cater a need to clone an instance of class. 
deepCloneObject will still preserve the instance of class. 


example: 
    
    import { deepCloneObject } from 'cute-js';        
    class Car {
        constructor(name, made){
            this.name = name
            this.made = made
        }
    }
    
    const aCar = new Car('Mazda',2018);
    const newCar = deepClone(aCar);
    
    console.log(newCar instanceOf Car); // true
    
### 2. Recursive Assign Value to Object
* This function will assign value according to path provided to an object.
* When accessing properties on object that has deep nested properties, the warning just throw error that is not helpful.
  With this function it will show the object and the path that fails.
* Warning: this function mutate the object, so use it with deepCloneObject to achieve immutability.
example: 
    
    import { recursiveAssignObject } from 'cute-js';
        
    const obj = {
        name: 'Joe',
        age: 23,
        address: {
            street: 'somewhere drv, no.23',
            postalCode: '11520',
            geoLocation: {
              lat: -6.12314,
              lon: 108.123123
            }
        },
    }
    
    recursiveAssignObject(obj, 'address.postalCode', 123);
    recursiveAssignObject(obj, 'address.geoLocation.lat', 0);
    obj.address.postalCode === 123; // true
    obj.address.geoLocation.lat === 0; // true
    
    
    
### 3. Recursive Get Value from Object
This function will retrieve value according to path provided to an object.
    
    import { recursivelyGetProperties } from 'cute-js';
        
    const obj = {
        name: 'Joe',
        age: 23,
        address: {
            street: 'somewhere drv, no.23',
            postalCode: '11520',
            geoLocation: {
              lat: -6.12314,
              lon: 108.123123
            }
        },
    }
    
    recursivelyGetProperties(obj, 'address.postalCode'); // '11520'
    recursivelyGetProperties(obj, 'address.geoLocation.lat'); //-6.12314