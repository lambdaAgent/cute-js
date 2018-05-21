* This Library contains some common helpful tools that I use the most as web developer.
* For documentation, A type annotation that is similar to Haskell is chosen as it's very compact and clear to read.

1. [Guide for Type annotation](#guide-for-type-annotation)
    * [type1](#type1)
    * [type2](#type2)

2. [Examples](#examples)
    * [Updating State in React](#1-updating-a-state-in-react)

3. [List of Functions](#list-of-functions)
    * [deepCloneObject](#1deep-clone-object)
    * [recursiveAssignObject](#2-recursive-assign-value-to-object)
    * [recursivelyGetProperties](#3-recursive-get-value-from-object)

# Guide for Type annotation
For documentation, A type annotation that is similar to Haskell is chosen as it's very compact and clear to read.

### type1
```
    recursiveAssignObject = obj:Obj{Any} -> path:String -> value:Any -> null
```
1. the name of function is `recursiveAssignObject`
2. This function return null;
3. It accepts, 3 parameters: (obj, path, value).


### type2
```
   onFieldChange = fieldPath:String -> e:Object{Event} -> Object { Any }
```
1. the name of function is `onFieldChange`
2. This function return Object of Any structure;
3. It accepts, 2 parameters: (fieldPath, e).


# Examples:
### 1. Updating a state in React

```
    import React from 'react';

    class SimpleForm extends React.Component {
        state = {
            location: {
                address: null,
                country: null,
                geoLocation: {
                    lat: null,
                    lng: null
                }
            }
        }

        render(){
            return (
                <form>
                    <label>Latitude</label>
                    <input
                        value={this.state.location.geoLocation.lat}
                        onChange={this.onFieldChange.bind(this, 'location.geoLocation.lat')}
                    />

                    <label>Longitude</label>
                    <input
                        value={this.state.location.geoLocation.lng}
                        onChange={this.onFieldChange.bind(this, 'location.geoLocation.lng')}
                    />
                </form>
            );
        }

        // onFieldChange = fieldPath:String -> e:Object{Event} -> null
        onFieldChange = (fieldPath, e) => {
            const value = e.target.value;
            let cloneLocation = deepCloneObject(this.state);
            recursiveAssignObject(cloneLocation, fieldPath, value );
            this.setState({ location: cloneLocation });
        }
    }

    export default SimpleForm;
```



# List of Functions:
### 1.Deep Clone Object
* This function will clone an object, a very simple and fast immutability function.
* It works with array too, although it's more efficient to use Array.slice() instead.

```
    TypeAnnotation:
    deepCloneObject = obj:Obj{Any} -> Options:Obj{ excludeKey:Bool } -> Obj{ Any }
```

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

```
    TypeAnnotation:
    recursiveAssignObject = Obj{Any} -> path:String -> value:Any -> null
```

```
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
```
    
    
### 3. Recursive Get Value from Object
This function will retrieve value according to path provided to an object.

```
    TypeAnnotation:
    recursivelyGetProperties = Obj {} -> path:String -> value:Any
```

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