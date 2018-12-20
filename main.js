let tokenizer = require("./tokenize");
let execute = require("./execute");
let code = ' var dd4 = 56 + 3;var Abc=5 + dd4 ;var k = hi;';
//let result = tokenizer.tokenize(code,1);
let commands = tokenizer(code);
//console.log(commands[0]);
let data = {variables:[]};
console.log(execute(data,commands[0]));
console.log(execute(data,commands[1]));