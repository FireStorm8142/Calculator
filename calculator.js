let runnningTotal = 0;
let buffer = "0";
let previousOp = null;
let activeop = null;
let screenClear = false;
const screen = document.querySelector('.screen');

//function that assesses button clicked
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        if (screenClear) buffer="0"
        screenClear =  false;
        handleNumber(value);
    }
    screen.innerText = buffer;
}

//function to handle +, -, * etc..
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer ='0'
            runnningTotal=0;
            break;
        case '=':
            if(previousOp === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOp = null;
            buffer = runnningTotal;
            runnningTotal=0;

            //function to clear op highlight
            if (activeop){
                activeop.classList.remove('active');
                activeop=null;
            }
            break;
        case '←':
            if(buffer.length===1){
                buffer='0';
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '.':
            if(buffer.length === 0) return;
            if(buffer.includes('.')) return;
            buffer += '.';
            break;
        case '÷':
        case '+':
        case '−':
        case '×':{
            screenClear=true;
            handleMath(symbol);
            break;
        }
    }
}

//function to handle intermediate symbols operation
function handleMath(symbol){
    if (buffer ==='0'){
        return;
    }
    const floatBuffer = parseFloat(buffer);

    if (runnningTotal === 0){
        runnningTotal = floatBuffer;
    }
    else{
        flushOperation(floatBuffer);
    }
    previousOp=symbol;

    //function for highlighting operator
    if(activeop){
        activeop.classList.remove('active');
    }
    activeop= [...document.querySelectorAll('.button.op')].find(btn=>btn.innerText===symbol);
    activeop.classList.add('active');
}

//function for performing the calculation
function flushOperation(floatBuffer){
    if(previousOp === '+'){
        runnningTotal += floatBuffer;
    }
    else if(previousOp === '−'){
        runnningTotal -= floatBuffer;
    }
    else if(previousOp === '×'){
        runnningTotal *= floatBuffer;
    }
    else if(previousOp === '÷'){
        runnningTotal /= floatBuffer;
    }
}

//function to display the number on screen
function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

//function to initialize calc
function init() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', event => {
            buttonClick(event.target.innerText);
        });
    });
}
init();