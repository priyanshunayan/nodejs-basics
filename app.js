const a = 1;
const b = 2;
const c = a+b;

console.log(c);
// Function Statement 

function greet(){
    console.log('Hi');
}
greet();


//First class functions

function logGreet(fn) {
    fn();
}
logGreet(greet);