function generatePassword() {
    const length = parseInt(document.getElementById("passwordLength").value);
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let characters = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?{}[]|';

    if (includeUppercase) {
        characters += uppercaseChars;
    }
    if (includeLowercase) {
        characters += lowercaseChars;
    }
    if (includeNumbers) {
            characters += numberChars;
    }
    if (includeSymbols) {
            characters += symbolChars;
    }
    
    let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
    
        document.getElementById("passwordOutput").value = password;
    }
    
    function copyToClipboard() {
        const output = document.getElementById("passwordOutput");
        output.select();
        output.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    
    document.getElementById("generatePassword").addEventListener("click", generatePassword);
    
    // Generate a default password on page load
    generatePassword();