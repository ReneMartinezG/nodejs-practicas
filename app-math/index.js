/*jshint esversion: 6 */ //espeficicar que se esta usando la vercion de EC6 para que no salgan advertencias
const math = require("./math.js"); // llamar al modulo y ponerle un alias

console.log(math.add(1,1));
console.log(math.substract(1,5));
console.log(math.multiply(4,3));
console.log(math.divide(1,0));
console.log(math.divide(5,10));