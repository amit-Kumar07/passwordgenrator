const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn =  document.querySelector("[data-copy]");
const copyMsg =  document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck =  document.querySelector("#lowercase");
const numbersCheck =document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const Indicator= document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".genrateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_-+=}{][:;"?<,>./';

// initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()
// set strength circle  color to grey
setIndicator("#ccc")

// set passwordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    let min = inputSlider.min;
    let max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    Indicator.style.backgroundColor = color;
    Indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// FOR Random number
function getRndInteger(min, max){
  return Math.floor(Math.random()*(max-min)) + min;
}


// for random number
function genrateRandomNumber(){
    return getRndInteger(0, 9);
}

// for lower character
function genrateLowerCase(){
  return String.fromCharCode(getRndInteger(97, 123))
}


// for uppercase character
function genrateUpperCase(){
    return String.fromCharCode(getRndInteger(65, 91))
  }


// for symbol
function genrateSymbol(){
 const randNum = getRndInteger(0, symbols.length);
 return symbols.charAt(randNum);
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked)  hasLower = true;
    if(numbersCheck.checked)  hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym ) && passwordLength >= 8){
        setIndicator("#0f0");
    }else if((hasLower || hasUpper) && (hasLower || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}


async function copyContent(){
    // to copy text on clipboard
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active"); 
    }, 2000);
}

function shufflePassword(array){
    // Fisher Yates Methods
    for(let i = array.length -1; i > 0; i--){
        // random j to find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        // swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str= " ";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChange(){
   checkCount = 0;
   allCheckBox.forEach((checkbox) =>{
    if(checkbox.checked)
    checkCount++;
   });
// special condition
if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}
} 


allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) =>{
    passwordLength= e.target.value;
    handleSlider()
})


copyBtn.addEventListener('click', () =>{
if(passwordDisplay.value)
copyContent();
});


generateBtn.addEventListener('click' ,() => {
//   none of the checkbox are selected
if(checkCount <=0) return;
if(passwordLength <checkCount){
    passwordLength = checkCount;
    handleSlider();
}
// let's start new password find
console.log("Starting the Journey")

// remove password
password=" ";
// let's put the stuff mentioned by checkboxes
// if(uppercaseCheck.checked){
//     password +=genrateUpperCase();
// }
// if(lowercaseCheck.checked){
//     password +=genrateLowerCase();
// }
// if(numbersCheck.checked){
//     password +=genrateRandomNumber();
// }
// if(symbolsCheck.checked){
//     password +=genrateSymbol();
// }


let funcArr = [];
if(uppercaseCheck.checked){
    funcArr.push(genrateUpperCase);
}
if(lowercaseCheck.checked){
    funcArr.push(genrateLowerCase);
}
if(numbersCheck.checked){
    funcArr.push(genrateRandomNumber);
}
if(symbolsCheck.checked){
    funcArr.push(genrateSymbol);
}

// for compulsory addition
for(let i = 0; i<funcArr.length; i++){
    password += funcArr[i]();
}
console.log("Compuxlsory addition done")

// Remaining additon
for(let i=0; i<passwordLength - funcArr.length; i++){
let randIndex = getRndInteger(0, funcArr.length);
password += funcArr[randIndex]();
}
console.log("Remaining addition done")
// shuffle the Password
password = shufflePassword(Array.from(password));
console.log("shiffling done")
// show in UI
passwordDisplay.value = password;
console.log("UI additon done")
// calculate strength 
calcStrength();
});