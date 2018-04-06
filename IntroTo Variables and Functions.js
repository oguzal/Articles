// Variables
var myName = "Oguz";
console.log("Hello " + myName);
var myNumber = 3;
myNumber="ewew";
console.log("My number x 2 ="+myNumber * 2);
console.log("typeof netIncome=" + typeof (netIncome));
console.log("typeof netIncome=" + typeof (message));


//  Exercise Store a number to a variable and add 10 to it and print the result to the console

var grossIncome = 10000;
var taxRatio = .2;
var message = "Your net income is";
var netIncome = grossIncome * (1 -taxRatio);
console.log("net Income = "+netIncome);
console.log("typeof netIncome=" + typeof (netIncome));
console.log("typeof netIncome=" + typeof (message));

// Functions

function CalculateNetIncome(incomeGross, taxRatio) {
    return incomeGross * (1 - taxRatio);
}

console.log(message + CalculateNetIncome(10000, .3));

// Control statements

function CalculateNetIncome(incomeGross) {
    var taxRatio;
    if (incomeGross >= 50000) {
        taxRatio = .3;
    }
    else if (incomeGross >= 20000) {
        taxRatio = .2;
    }
    else {
        taxRatio = 0;
    }
    return incomeGross - (1 * taxRatio);

}


