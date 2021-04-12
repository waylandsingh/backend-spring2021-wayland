function factor(num1, num2) { // 2 7

    let total = 0;

    for (let i = num1; i <= num2; i++) {
        total = total + i;
    }

    console.log(`The factorial for ${num1} and ${num2} is ${total}.`)
   
    return total;
}

function addNumber(num1, num2) {
    return num1 + num2;
}

var superSecretPassword = "123456";

module.exports = {
    factorial: factor,
    addNumber,
    password: superSecretPassword
}