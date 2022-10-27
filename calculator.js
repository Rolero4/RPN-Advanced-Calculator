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
            case "delete":
                calculator.delete();
                break;
            case "cancel":
                calculator.clear();
                break;
            case "e<br>n<br>t<br>e<br>r":
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
            case "gcd":
                calculator.gcd();
                break;
            case "rlp":
                calculator.rlp();
                break;
            case "slp":
                calculator.slp();
                break;
        }
    },
    //blocked input
    addNumberToDisplay: function(str){
        if(!calculator.input.innerText.includes("=")){
            if(calculator.input.innerText == 0)
                calculator.input.innerText = str;
            else
                calculator.input.innerText += str;
        }
    },

    //modulo, mnożenie, dodawanie, odejmowanie
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

    //Greatest common divisor
    gcd: function(){
        if(calculator.stack.length > 1){
            let a = Math.abs(calculator.stack[1]);
            let b = Math.abs(calculator.stack[0]);
            calculator.stack.shift();
            calculator.stack.shift();
            let result = 0;
            if (b > a) {var temp = a; a = b; b = temp;}
            while (true) {
                if (b == 0){
                    result =  a;
                    break;
                }
                a %= b;
                if (a == 0){
                    result = b
                    break;
                }
                b %= a;
            }
            calculator.stack.unshift(result);
            calculator.stackDisplay();
        }
    },

    //rozkład na czynniki
    rlp: function(){
        let value = calculator.input.innerText;
        let display = "";
        let numbers = [];
        if ( value != "" && value > 1){
            let i = 2;
            let e = Math.floor(Math.sqrt(value));
            while (i <= e) {
                while((value % i) == 0) {
                    numbers.unshift(i);
                    value = Math.floor(value/i);
                    e = Math.floor(Math.sqrt(value));
                }
                i++;
            }
            if (value > 1){
                numbers.unshift(value);
            }
        
            const uniqueElements = this.toExp(numbers);
            let howManyTimes = [];
            for(let i=0; i< uniqueElements.length; i++){
                howManyTimes.push(this.howManyTimesInArray(uniqueElements[i], numbers));
            }
            //console.log(howManyTimes);
            let rest = "";
            for(let i = 0; i<uniqueElements.length; i++){
                rest += uniqueElements[i];
                if(howManyTimes[i] >1 ){
                    rest += "^"+howManyTimes[i];
                }
                if( i< uniqueElements.length -1 ){
                    rest += " × ";
                }
            }

            display = calculator.input.innerText + "= " + rest;

            calculator.display(display);
        }
    },

    toExp: function(numbers){
        uniqueElements = [];
        for(let i = 0; i < numbers.length; i++){
            if(!uniqueElements.includes(numbers[i])){
                uniqueElements.unshift(numbers[i])
            }
        }
        return uniqueElements;
    },

    howManyTimesInArray: function(checkingElement, numbers){
        let count = 0;
        for (const element of numbers) {
            if (element == checkingElement) {
              count += 1;
            }
        }
        //console.log(count);
        return count;
    },



    //goldbach hipoteza
    slp: function(){
        const MAX = calculator.input.innerText;
        if (MAX > 2 && MAX % 2 == 0){

            let primes = new Array();
    
            // Utility function for Sieve of Sundaram
            // In general Sieve of Sundaram, produces
            // primes smaller than (2*x + 2) for a
            // number given number x. Since we want
            // primes smaller than MAX, we reduce
            // MAX to half. This array is used to
            // separate numbers of the form i + j + 2*i*j
            // from others where 1 <= i <= j
            let marked = new Array(parseInt(MAX / 2) + 100).fill(false);
    
            // Main logic of Sundaram. Mark all
            // numbers which do not generate prime
            // number by doing 2*i+1
            for (let i = 1; i <= (Math.sqrt(MAX) - 1) / 2; i++)
                for (let j = (i * (i + 1)) << 1;
                    j <= MAX / 2; j = j + 2 * i + 1)
                    marked[j] = true;
        
            // Since 2 is a prime number
            primes.push(2);
        
            // Print other primes. Remaining primes
            // are of the form 2*i + 1 such that
            // marked[i] is false.
            for (let i = 1; i <= MAX / 2; i++)
                if (marked[i] == false)
                    primes.push(2 * i + 1);
    
            // Check only upto half of number
            for (let i = 0; primes[i] <= MAX / 2; i++)
            {
                // find difference by subtracting
                // current prime from n
                let diff = MAX - primes[i];
        
                // Search if the difference is also a
                // prime number
                if (primes.includes(diff))
                {
                    // Express as a sum of primes
                    this.input.innerHTML = MAX+ "= " + primes[i] + " + " + diff;
                    //without break there is option to print all options
                    break;
                }
            }       
        }
    },



    //clearing input
    delete: function(){
        this.input.innerHTML = "0";
    },

    //clearing whole calcultor
    clear: function(){
        this.input.innerHTML = "0";
        this.stack = [];
        this.stackDisplay();
    },

    //move value from display input on stack
    enter: function(){
        if(calculator.input.innerText.includes("=")){
            const value = calculator.input.innerText.split("=")
            this.stack.unshift(value[0]);
            calculator.input.innerHTML = "0";
            this.stackDisplay();
        }else{
            this.stack.unshift(this.input.innerText);
            calculator.input.innerHTML = "0";
            this.stackDisplay();
        }
    },

    //display two top values from stack
    stackDisplay: function(){
        if(calculator.stack[0] >= Number.MAX_VALUE){
            calculator.clear();
            calculator.input = "Błąd";
        }
        else{
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
        }
    },

    //changing displayed numbers of stack
    swap: function(){
        if(calculator.stack.length>1){
            const temp = calculator.stack[0]
            calculator.stack[0] = calculator.stack[1];
            calculator.stack[1]= temp; 
            //console.log(calculator.stack);
            calculator.stackDisplay();
        }
    },


    display: function(str){
        calculator.input.innerHTML = "\\(" + str + "\\)";
        MathJax.typeset();
    },
}

// https://www.youtube.com/watch?v=SUv6Uaggvhc&t=545s