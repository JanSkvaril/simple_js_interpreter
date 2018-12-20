
function execute(data,command){
    if(command.type == "error") return;
    else if (command.type == "varDeclaration"){
        data.variables[command.name.toString()] = execValue(data,command.value);
    }

    return data;
}

function execValue(data,value){
  if (value.type == "number"){
      return value.value;
  }
  else if (value.type == "calculation"){
      if (value.containsVariable == true){
       value.value = replaceVar(data,value.value);
      }
      return calculate(value.value);
  }
  else if (value.type == "variable"){
      return replaceVar(data,value.value);
  }
}

function replaceVar(data,val){
    let variables = val.match(/[a-zA-Z]+\d*/g);
 
    for (variable of variables) {
        console.log("variables: " + variable);
        if (!!data.variables[variable.toString()]){
           val = val.replace(variable.toString(),data.variables[variable.toString()]);
        }
    }
    return val;
}

function calculate(value){
    if (!!value.match(/[a-zA-Z]/g)){

    }
   
    else return eval(value);

}

module.exports = execute;
