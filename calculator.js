let runningTotal = 0;   
let buffer = "0";
let prevOperator = null;
const screen = document.querySelector(".screen");


document.querySelector(".calc-buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
});

function buttonClick(value){
    console.log(value);
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value){
   switch(value){
       case 'C':
           buffer = "0";
           runningTotal = 0;
           prevOperator = null;
           break;
        case "=":
            if (prevOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0; 
            break;
        case "←":
            if (buffer.length === 1){
                buffer = "0";
            }  
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
   }
}

function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    }
    else{
        buffer += value;
    }  
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    prevOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer){

    if(prevOperator === "+"){
            runningTotal += intBuffer;
    }
    else if(prevOperator === "-"){
        runningTotal -= intBuffer;
    }
    else if(prevOperator === "×"){
        runningTotal *= intBuffer;
    }
    else if(prevOperator === "÷"){
        runningTotal /= intBuffer;
    }
}

function rerender(){
    screen.innerText = buffer;
}