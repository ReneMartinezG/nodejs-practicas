//esto es un modulo
// un modulo es un archivo que nos permite dividir nuestro archivo en multiples partes
/*jshint esversion: 6 */
const add = (x1,x2) => 
{
    return x1 + x2;
};

const substract = (x1,x2) => 
{
    return x1 - x2;
};

const multiply = (x1,x2) =>
{
    return x1 * x2;
};

const divide = (x1,x2) =>
{
    if (x2 == 0) {
        console.log("no se puede dividir entre 0");
    } else {
        return x1/x2;
    }
};
 
exports.add = add;
exports.substract = substract;
exports.multiply = multiply;
exports.divide = divide;