function tokenize(code){
    let lines = code.split(";");
    let result = [];
    for(line of lines){
        result.push(parseCommand(line));
    }    
    return result;
}

function parseCommand(command){
    let result = {};

       //variable declaration
    if (!!command.match(commandRegex.variableDeclaration)){
        let regexResult = commandRegex.variableDeclaration.exec(command);
        result.type = "varDeclaration";
        result.name = regexResult[1];
        result.value = parseVariableValue(regexResult[2]);
    }
        //variable
    else if (!!command.match(commandRegex.variable)){
        let regexResult = commandRegex.variable.exec(command);
        result.type = "var";
        result.name = regexResult[1];
        result.value = parseVariableValue(regexResult[2]);
    }
    else{
        result.type = "error";
        result.value = command;
    }

    return result;
}
function parseVariableValue(value){
    let result = {};

    //no functions, loops, if statements etc. in value are allowed;
    if (!!value.match(varValueRegex.dangerous)){
        result.type = "danger";
        result.value = 0;
        return result;
    }


    //value type
    if (!!value.match(varValueRegex.number)){
        result.type = "number";
        result.value = parseInt(value);
    }
    else if (!!value.match(varValueRegex.isCalculation)){
        result.type = "calculation";
        result.value = value;
    }
    else {
        result.type = "variable";
        result.value = value;
    }

    //if contains variable
    if (!!value.match(varValueRegex.containsVariable)){
        result.containsVariable = true;
    }
    else  result.containsVariable = false;

    return result;
}


const commandRegex = {
    variableDeclaration:/\bvar\s+([a-zA-Z]+\d*)\s?=\s*(.+)/g,
    variable: /([a-zA-Z]+\d*)\s?=\s*(.+)/g
};
const varValueRegex = {
    number:/^\d*$/g,
    isCalculation: /[-*+/]/g,
    dangerous: /\w+\s*\(.*\)/g,
    containsVariable:/[a-zA-Z]/g
};

module.exports = tokenize;
