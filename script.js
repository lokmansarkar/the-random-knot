// DOM Element References
const passwordBox = document.getElementById('password');
const lengthInput = document.getElementById('password-length');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generateBtn = document.querySelector("button");
const copyBtn = document.querySelector(".display img");

// Character Sets
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()-_=+/<>,.[]{}|';

// Creates a random password based on user selections.
 
function createPassword() {
    const length = parseInt(lengthInput.value) || 12; // Get password length (default 12)
    
    let allChars = ''; 
    let password = ''; 

    // Add character sets based on user selection
    if (includeUppercase.checked) allChars += upperCaseChars;
    if (includeLowercase.checked) allChars += lowerCaseChars;
    if (includeNumbers.checked) allChars += numberChars;
    if (includeSymbols.checked) allChars += symbolChars;

    // Edge case: If no character types are selected
    if (allChars === '') {
        passwordBox.value = 'Select char types!';
        return;
    }

    // Generate the password by randomly picking characters
    for (let i = 0; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Display the generated password
    passwordBox.value = password;
}

 // Copies the generated password to the clipboard.

function copyPassword() {
    if (passwordBox.value && passwordBox.value !== 'Select char types!') {
        // Copy password to clipboard
        navigator.clipboard.writeText(passwordBox.value)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Could not copy text: ', err));
    } else {
        alert('Generate a password first!');
    }
}

// Event Listeners for the buttons
generateBtn.addEventListener('click', createPassword);
copyBtn.addEventListener('click', copyPassword);
