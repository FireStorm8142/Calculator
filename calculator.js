let runnningTotal = 0;
let buffer = "0";
let previousOp = null;
let activeop=null;
const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer ='0'
            runnningTotal=0;
            break;
        case '=':
            if(previousOp === null){
                return
            }
            flushOperation(parseInt(buffer));
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
        case '÷':
        case '+':
        case '−':
        case '×':{
            handleMath(symbol);
            break;
        }
    }
}
function handleMath(symbol){
    if (buffer ==='0'){
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runnningTotal === 0){
        runnningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOp=symbol;
    buffer='0';

    //function for highlighting operator
    if(activeop){
        activeop.classList.remove('active');
    }
    activeop= [...document.querySelectorAll('.button.op')].find(btn=>btn.innerText===symbol);
    activeop.classList.add('active');
}
function flushOperation(intBuffer){
    if(previousOp === '+'){
        runnningTotal += intBuffer;
    }
    else if(previousOp === '−'){
        runnningTotal -= intBuffer;
    }
    else if(previousOp === '×'){
        runnningTotal *= intBuffer;
    }
    else if(previousOp === '÷'){
        runnningTotal /= intBuffer;
    }
}
function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

function init() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', event => {
            buttonClick(event.target.innerText);
        });
    });
}
init();