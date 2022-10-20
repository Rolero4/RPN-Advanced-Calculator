window.onload = function(){
    calculator.init();
};

let calculator = {
    input: undefined,
    firstOnStack: undefined,
    secondOnStack: undefined,
    buttons: undefined,
    stack: undefined,


    //init stuff
    init: function(){
        this.buttons = document.querySelectorAll('.btn'); 
        this.input = document.getElementById("result");
        this.firstOnStack = document.getElementById("firstOnStack");
        this.secondOnStack = document.getElementById("secondOnStack");
        this.stack = [];
        //console.log();

        document.getElementById("changeOnStack").addEventListener('click', calculator.swap);
        for(let i = 0; i < this.buttons.length; i++){
            let el = this.buttons[i];
            el.addEventListener("click", this.buttonClick);
        }
    },

    buttonClick: function(e){
        let divHtmlText = e.target.innerHTML;
        console.log(divHtmlText);
        switch (divHtmlText) {
            case "cancel":
                calculator.clear();
            break;
            case "enter":
                calculator.enter();
            break;
            case "9":
            case "8":
            case "7":
            case "6":
            case "5":
            case "4":
            case "3":
            case "2":
            case "1":
            case "0":
                calculator.addNumberToDisplay(divHtmlText);
            break;
            case "+":
            case "-":
            case "×":
            case "%":
                calculator.simpleOperand(divHtmlText);
            break;
            case "x^y":
                calculator.power();
            break;
            case "÷": 
                calculator.divisionInt();
            break;
        }
    },

    addNumberToDisplay: function(str){
        //let display = calculator.input.value + '';
        //if(display.length < 7 || (display.includes(".") && display.length == 7 && str != 0))
        calculator.input.value += str;
    },

    simpleOperand: function(operation){
        if(calculator.stack.length > 1){
            const first = '(' + calculator.stack[1] + ')';
            const second = '(' + calculator.stack[0] + ")";
            calculator.stack.shift();
            calculator.stack.shift();
            if( operation == "×")
                operation = "*";
            operation = operation +'';

            const expression = first + operation + second;
            calculator.stack.unshift(eval(expression));
            calculator.stackDisplay();
        }
    },

    //Power
    power: function(){
        if(calculator.stack.length > 1){
            const first = calculator.stack[1];
            const second = calculator.stack[0];
            calculator.stack.shift();
            calculator.stack.shift();
            if(second>0){
                calculator.stack.unshift(Math.pow(first, second));
                calculator.stackDisplay();
            }
        }
    },

    //Integer division
    divisionInt: function(){
        if(calculator.stack.length > 1){
            const first = calculator.stack[1];
            const second = calculator.stack[0];
            calculator.stack.shift();
            calculator.stack.shift();
            calculator.stack.unshift(Math.floor(first / second));
            calculator.stackDisplay();
        }
    },

    //clearing whole calcultor
    clear: function(){
        this.input.value = "";
        this.stack = [];
        this.stackDisplay();
    },


    enter: function(){
        if(calculator.input.value != ""){
            this.stack.unshift(this.input.value);
            calculator.input.value = "";
            this.stackDisplay();
        }
    },

    //stack display
    stackDisplay: function(){
        if(calculator.stack.length > 0){
            calculator.firstOnStack.value = calculator.stack[0];
            if(calculator.stack.length>1)
                calculator.secondOnStack.value = calculator.stack[1];
            else
                calculator.secondOnStack.value = "";
        }
        else{
            calculator.firstOnStack.value = "";
            calculator.secondOnStack.value = "";

        }
    },

    //changing displayed numbers of stack
    swap: function(){
        if(calculator.stack.length>1){
            const temp = calculator.stack[0]
            calculator.stack[0] = calculator.stack[1];
            calculator.stack[1]= temp; 
            console.log(calculator.stack);
            calculator.stackDisplay();
        }
    },
}