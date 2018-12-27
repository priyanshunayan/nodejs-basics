/* const a = 1;
const b = 2;
const c = a+b;

console.log(c);
// Function Statement 

function greet(){
    console.log('Hi');
}
greet(); */


//First class functions

/* function logGreet(fn) {
    fn();
}
logGreet(greet); */

// Module 
/* const greet = require('./greet');
greet(); */

// Object Litereals

/* const People = {
    name: 'Priyanshu',
    address: {
        street: 'Bakers Street',
        flat: 340
    }
}

console.log(People.address); */

// Function constructors 

function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}
Person.prototype.greet = function() {
    console.log("Hey!, " + this.firstname + " " +   this.lastname);
}
const Person1 = new Person('Jon', 'Doe');

console.log(Person1.firstname);
Person1.greet();