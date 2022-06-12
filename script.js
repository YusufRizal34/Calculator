let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'
let displayAll = ''
let isResult = false
let isDot = false

const calculatorScreen1 = document.querySelector('.calculator-screen-1')
const calculatorScreen2 = document.querySelector('.calculator-screen-2')
const numbers = document.querySelectorAll(".number")
const operators = document .querySelectorAll(".operator")
const equalSign = document.querySelector('.equal-sign')
const clearBtn = document.querySelector('.all-clear')
const deleteBtn = document.querySelector('.delete')
const decimal = document.querySelector('.decimal')
const percentage = document.querySelector('.percentage')

const updateScreen1 = (number) => {
    calculatorScreen1.value = number
}

const updateScreen2 = () => {
    calculatorScreen2.value = displayAll
}

const inputNumber = (number) => {
    if(currentNumber === '0' && isResult == false){
        currentNumber = number
    }
    else if(isResult == false){
        currentNumber += number
    }
    else if(isResult == true){
        currentNumber = number
    }
    
    if(isDot){
        isDot = false
    }
}

const inputOperator = (operator) => {
    if(calculationOperator === '' && isDot == false){
        prevNumber = currentNumber
        calculationOperator = operator
        if(displayAll === ''){
            displayAll = prevNumber + operator
        }
        else{
            displayAll += operator
        }
        currentNumber = '0'
    }

    isResult = false
}

const calculate = () => {
    switch(calculationOperator){
        case "+":
            return result = parseFloat(prevNumber) + parseFloat(currentNumber)
        case "-":
            return result = parseFloat(prevNumber) - parseFloat(currentNumber)
        case "x":
            return result = parseFloat(prevNumber) * parseFloat(currentNumber)
        case "/":
            return result = parseFloat(prevNumber) / parseFloat(currentNumber)
        default:
        break
    }
}

const calculateEqual = () => {
    if(isResult == false && prevNumber !== '' && calculationOperator !== '' && isDot == false){
        let result = calculate()
        displayAll += currentNumber
        currentNumber = result
        calculationOperator = ''
        isResult = true
    }
}

const calculatePercentage = () => {
    if(isResult == false){
        if(prevNumber !== ''){
            currentNumber /= 100
            displayAll = prevNumber + calculationOperator + currentNumber
        }
        else{
            currentNumber = '0'
            displayAll = '0'
        }
    }
}

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
    displayAll = ''
    isResult = false
}

const deletePrev = () => {
    if(isResult == false){
        if(currentNumber.length > 1){
            currentNumber = currentNumber.substring(0, currentNumber.length - 1)
        }
        else if(isDot){
            currentNumber = currentNumber.substring(0, currentNumber.length - 1)
            isDot = false
        }
        else{
            currentNumber = '0'
            isResult = false
        }
    }
    else if(isResult == true){
        displayAll = ''
        isResult = false
    }
}

inputDecimal = (dot) => {
    if(isResult == false && currentNumber){
        if(currentNumber.includes('.')){
            return
        }
        currentNumber += dot
        isDot = true
    }
}

clearBtn.addEventListener("click", () => {
    clearAll()
    updateScreen1(currentNumber)
    updateScreen2()
})

deleteBtn.addEventListener("click", () => {
    deletePrev()
    updateScreen1(currentNumber) 
    updateScreen2()
})

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
        updateScreen2()
    })
})

equalSign.addEventListener("click", () => {
  calculateEqual()
  if(isResult){
    updateScreen1(currentNumber)
    updateScreen2()
  }
})

percentage.addEventListener("click", () => {
  calculatePercentage()
  updateScreen1(currentNumber)
  updateScreen2()
})

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen1(currentNumber)
        updateScreen2()
    })
})

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value)
    updateScreen1(currentNumber)
    updateScreen2()
})