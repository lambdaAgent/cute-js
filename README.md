* This Library contains some common helpful tools that I use the most as web developer.
* For documentation, A type annotation that is similar to Haskell is chosen as it's very compact and clear to read.

1. [Examples](#examples-in-react)
    * [Updating State in React](#1-updating-and-validating-state-in-react)

2. [Guide for Type annotation](#guide-for-type-annotation)
    * [type1](#type1)
    * [type2](#type2)

3. [List of Functions](#list-of-functions)
    * [deepCloneObject](#1deep-clone-object)
    * [recursiveAssignObject](#2-recursive-assign-value-to-object)
    * [recursivelyGetProperties](#3-recursive-get-value-from-object)

# Examples in React:
### 1. Updating and validating state in React

```
import React from 'react';
import {recursivelyGetProperties, recursiveAssignObject, deepCloneObject } from 'cute-js';

class SimpleForm extends React.Component {
    state = {
      location: {
          address: null,
          country: null,
          geoLocation: {
              lat: null,
              lng: null
          }
      },
      errorLocation : {
        address: null,
        country: null,
        geoLocation: {
            lat: null,
            lng: null
        }
      }
    }

    render(){
        const errorStyle={ color: 'red' };
        return (
            <form>
                <label>Latitude</label>
                <input
                    value={this.state.location.geoLocation.lat}
                    onChange={this.onFieldChange.bind(this, 'geoLocation.lat')}
                    onBlur={this.onValidating.bind(this, 'geoLocation.lat')}
                />
                <div style={errorStyle}>{this.state.errorLocation.geoLocation.lat}</div>

                <label>Longitude</label>
                <input
                    value={this.state.location.geoLocation.lng}
                    onChange={this.onFieldChange.bind(this, 'geoLocation.lng')}
                    onBlur={this.onValidating.bind(this, 'geoLocation.lng')}
                />
                <div style={errorStyle}>{this.state.errorLocation.geoLocation.lng}</div>

                <label>Address</label>
                <input
                    value={this.state.location.address}
                    onChange={this.onFieldChange.bind(this, 'address')}
                    onBlur={this.onValidating.bind(this, 'address')}
                />
                <div style={errorStyle}>{this.state.errorLocation.address}</div>


                <label>Country</label>
                <input
                    value={this.state.location.country}
                    onChange={this.onFieldChange.bind(this, 'country')}
                    onBlur={this.onValidating.bind(this, 'country')}
                />
                <div style={errorStyle}>{this.state.errorLocation.country}</div>
            </form>
        );
    }

  //onFieldChange = fieldPath::String -> e::Object{Event} -> null
    onFieldChange = (fieldPath, e) => {
        const value = e.target.value;
        const cloneState = deepCloneObject(this.state);
        const { location } = cloneState;
        recursiveAssignObject(location, fieldPath, value );
        this.setState({ location });
    }

 // onValidating = fieldPath::String -> e::Object{Event} -> null
    onValidating = (fieldPath, e) => {
        const value = recursivelyGetProperties(this.state.location, fieldPath );
        const cloneError = deepCloneObject(this.state.errorLocation);
        const isValid = !!value;
        console.log(isValid);
        if(!isValid){
            recursiveAssignObject(cloneError, fieldPath, 'NOT VALID')
        } else {
            recursiveAssignObject(cloneError, fieldPath, '')     
        }
        this.setState({ errorLocation: cloneError });
    }
}

export default SimpleForm;
```


# Guide for Type annotation
For documentation, A type annotation that is similar to Haskell is chosen as it's very compact and clear to read.

## Example Of Types:
### type1
```
recursiveAssignObject = obj::Obj{Any} -> path::String -> value::Any -> null
```
1. the name of function is `recursiveAssignObject`
2. This function return `null`
3. It accepts, 3 parameters: (obj, path, value).


### type2
```
onFieldChange = fieldPath::String -> e::Object{Event} -> Object { Any }
```
1. the name of function is `onFieldChange`
2. This function return `Object of Any structure`
3. It accepts, 2 parameters: (fieldPath, e).



# List of Functions:
### 1.Deep Clone Object
* This function will clone an object, a very simple and fast immutability function.
* It works with array too, although it's more efficient to use Array.slice() instead.
* Cloning will preserve the instance of object, that's why it will preserve Array as Array not an Object (Most clone library will not preserve it).

```
TypeAnnotation:
deepCloneObject = obj::Obj{Any} -> opt::Obj{ excludeKey::Bool } -> Obj{ Any }
```

example: 
```
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
```

To cater a need to clone an instance of class. 
deepCloneObject will still preserve the instance of class.

example: 
```    
import { deepCloneObject } from 'cute-js';        
class Car {
    constructor(name, made){
        this.name = name
        this.made = made
    }
}

const aCar = new Car('Mazda',2018);
const newCar = deepCloneObject(aCar);

console.log(newCar instanceOf Car); // true
```
    
### 2. Recursive Assign Value to Object
* This function will assign value according to path provided to an object.
* When accessing properties on object that has deep nested properties, Vanilla js will just throw an error that is not helpful.
  With this function it will show the object and the path that fails.
* Warning: this function mutate the object, so use it with deepCloneObject to achieve immutability.
example:

```
TypeAnnotation:
recursiveAssignObject = Obj{Any} -> path::String -> value::Any -> null
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
* This function will retrieve value according to path provided to an object.
* When accessing properties on object that has deep nested properties, Vanilla js will just throw an error that is not helpful.
  With this function it will show the object and the path that fails.

```
TypeAnnotation:
recursivelyGetProperties = Obj {Any} -> path::String -> value::Any
```
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
```