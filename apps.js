// PASSWORD GENERATOR

// Character Generator Functions

// This function accepts strings as arguments and returns a random index number from the string argument
function randomIndex(str){
    return Math.floor(Math.random() * str.length);
}
// Example of the randomIndex function
console.log(randomIndex(`Chicken`)); // 0, 1, 2, 3, 4, 5, 6



// This returns a lowercase letter from the alphabet
function getRandomLower() {
    const letters = `abcdefghijklmnopqrstuvwxyz`
    return letters[randomIndex(letters)];
}

// This returns a Uppercase letter from the alphabet
function getRandomUpper() {
    const letters = `QWERTYUIOPASDFGHJKLZXCVBNM`
    return letters[randomIndex(letters)];
}

// This returns a random number
function getRandomNumber() {
    const number = `1234567890`
    return number[randomIndex(number)];
}

// This gives a random symbol
function getRandomSymbol() {
    const symbol = `!@#$%^&*()=-<>?`
    return symbol[randomIndex(symbol)];
}
console.log(getRandomLower());
console.log(getRandomUpper());
console.log(getRandomNumber());
console.log(getRandomSymbol());


// Object to store all the character generator functions 
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Selecting the DOM Elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`)
const generateEl = document.querySelector(`#generate`);


// Generate Password Function
// Accepts true or false values and a number as arguments
// NOTE: The checkboxes and length box are the inputs/arguments that are entered
function generatePassword(low, upp, num, sym, length){
    console.log(low, upp, num, sym, length);

    // 1. CREATE THE PASSWORD VARIABLE
    let generatePassword = ``;

    // 2. FILTER OUT UNCHECKED OPTIONS
    // true = 1, false = 0
    // This will be used when building out the password
    const typesCount = low + upp + num + sym;
    console.log(typesCount);
    
    if (typesCount === 0){
        alert(`Please select at least one option`)
        // This return stops the entire function (stops the generatePassword function)
        return ``;
    }

    // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomfunction objects. Also, the second items in each nested array are of the values passed into this generatePassword function
    let typesArr = [
        [`lower`, low],
        [`upper`, upp],
        [`number`, num],
        [`symbol`, sym]
    ];
    console.log(typesArr);

    // This will return only the true items (AKA the checked boxes) into the changed typesArr
    // Simply kicks out the false ones
    typesArr = typesArr.filter(item => {
        console.log(item);
        // The [1] means it will check the idex of 1 value in each array inside the typesArr
        return item[1]; 
    });
    console.log(typesArr);

    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION

    for (i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            // an item from the typesArr will be passed in as the parameter/argument
            const funcName = type[0];
            console.log(funcName);
            // "generatePassword" was made empty in step 1.
            // This calls on the earlier random functions using the keys
            generatePassword += randomFunctions[funcName]();
            console.log(generatePassword);
        });
    }
    
    // 4. ADD THE GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE, RETURN IT OUT OF THE FUNCTION
    
    // This makes sure that the length is correct
    const finalPassword = generatePassword.slice(0, length);
    console.log(finalPassword);
    
    return finalPassword;
}


// Event listener for when the button is clicked
generateEl.addEventListener(`click`, () => {
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const length = parseInt(lengthEl.value);

    console.log(hasLower, hasUpper, hasNumber, hasSymbol);
    
    // This actually displays the password in the span results element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

// COPY PASSWORD 
clipboardEl.addEventListener(`click`, () => {

    // JavaScript needs the text to be in a textarea to be able to select and copy it
    const textarea = document.createElement(`textarea`)
    const password = resultEl.innerText;

    // If the user clicks the clipboard button when no password was made, it will display an alert.
    if (password === ``){
        alert(`Please generate a password first`)
        return;
    }

    // console.dir(navigator);
    // references the "navigator" object to copy the selected value to the clipboard on the device
    navigator.clipboard.writeText(password);
});