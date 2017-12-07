This Library some common helpful tools.

### 1.Deep Clone Object
This function will clone an object, a very simple immutability function.
example: 
    
    import { deepCloneObject, deepEqual } from 'cute-js';
    // deepEqual is work in progess
        
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
    deepEqual(newObj, obj); // true
    
    
### 2. Recursive Assign Value to Object
This function will assign value according to path provided to an object.
Warning: this function mutate the object, so use it with deepCloneObject to achieve immutability.
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