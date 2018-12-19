let tokenizer = require("./tokenize");
let code = ' var dd4 = 56 + 6;Abc=5 ; = hi;';
//let result = tokenizer.tokenize(code,1);
console.log(tokenizer(code));