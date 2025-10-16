// DOM Element References
const passwordBox = document.getElementById('password');
const lengthInput = document.getElementById('password-length');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');

// Character Sets
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()-_=+/<>,.[]{}|'; // Added more symbols for better security

/**
 * Creates a strong, random password based on user selections.
 */
function createPassword() {
    // 1. Get user-defined settings
    const length = parseInt(lengthInput.value) || 12; // Default to 12 if invalid
    
    let allChars = '';
    let requiredChars = []; // Array to ensure at least one of each selected type is included

    // 2. Build the main character set and the required characters array
    if (includeUppercase.checked) {
        allChars += upperCaseChars;
        requiredChars.push(upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
    }
    if (includeLowercase.checked) {
        allChars += lowerCaseChars;
        requiredChars.push(lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]);
    }
    if (includeNumbers.checked) {
        allChars += numberChars;
        requiredChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (includeSymbols.checked) {
        allChars += symbolChars;
        requiredChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }

    // Edge case: If no character types are selected
    if (allChars.length === 0) {
        passwordBox.value = 'Select char types!';
        return;
    }
    
    let password = requiredChars.join(''); // Start password with the guaranteed characters

    // 3. Fill the rest of the password length with random characters from the full set
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // 4. Shuffle the password to prevent the required characters from always being at the start
    password = shuffleString(password);

    // 5. Display the result
    passwordBox.value = password;
}

/**
 * Helper function to shuffle a string (improves randomness and security).
 * @param {string} str - The string to shuffle.
 * @returns {string} The shuffled string.
 */
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 destructuring swap
    }
    return arr.join('');
}


/**
 * Copies the generated password to the clipboard using the modern API.
 */
function copyPassword() {
    if (passwordBox.value && passwordBox.value !== 'Select char types!') {
        // Use the modern Clipboard API
        navigator.clipboard.writeText(passwordBox.value)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                // In a real project, you might include a document.execCommand fallback here
            });
    } else {
        alert('Generate a password first!');
    }
}