window.onload = function(){
    calculator.init();
};

let calculator = {
    buttons: undefined,
    input: undefined,
    stack: undefined,
    firstOnStack: undefined,
    secondOnStack: undefined,
    first_number: 0,
    current_operand: "",

    init: function(){
        this.buttons = document.querySelectorAll('.btn'); 
        
        this.input = document.getElementById("result");
        this.firstOnStack = document.getElementById("firstOnStack");
        this.secondOnStack = document.getElementById("secondOnStack");
        console.log(this.firstOnStack.value);

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
            case "%":
                calculator.input.value = calculator.input.value/100;
                break;
            case "=":
                calculator.evaluate();
            break;
            case "AC":
                calculator.current_operand= "";
                calculator.clear();
            break;
            case "+/-":
                calculator.changeSign();
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
            case "÷": 
            calculator.addOperand(divHtmlText);
            break;
            case ",": 
            if(!calculator.input.value.includes(".") && !calculator.input.value == "")
                calculator.addNumberToDisplay(".");
            break;
        }
    },

    addNumberToDisplay: function(str){
        let display = calculator.input.value + '';
        if(display.length < 7 || (display.includes(".") && display.length == 7 && str != 0))
            calculator.input.value += str;
    },

    changeSign(){
        calculator.input.value = -calculator.input.value;
    },

    clear: function(){
        this.input.value = "";
    },

    addOperand: function(str){
        if(this.input.value != ""){
            this.first_number = this.input.value;
            if( str == "÷")
                this.current_operand = "/"; 
            else if(str == "×")
                this.current_operand= "*";
            else
                this.current_operand = str;
            console.log(this.current_operand);
            calculator.clear();
        }
        else if(this.input.value == "" && typeof(calculator.first_number) != undefined){
            if( str == "÷")
                this.current_operand = "/"; 
            else if(str == "×")
                this.current_operand= "*";
            else
                this.current_operand = str;
        }

    },

    evaluate: function(){
        if(this.current_operand != "" || this.current_operand != undefined){
            if(this.current_operand == "/" && this.input.value == 0)
                calculator.input.value = "error"
            else{
                let result = eval(this.first_number + this.current_operand+ this.input.value);
                let display = calculator.input.value + '';
                if(display.length > 6 )
                    calculator.input.value = result.toExponential(2);
                else
                    calculator.input.value = result;
            }
        }
    },


    swap: function(){
        const temp = calculator.firstOnStack.value;
        calculator.firstOnStack.value = calculator.secondOnStack.value;
        calculator.secondOnStack.value = temp; 
    }
}