// Cache DOM elements
const form = document.getElementById('form'),
    usernameInput = document.getElementById('username'),
    emailInput = document.getElementById('email'),
    pwdInput = document.getElementById('password'),
    confPwdInput = document.getElementById('confPassword');

// Validate form inputs
function validateInputs(input) {
    if (input.value === '') {
        showError(input, 'This field cannot be empty');
    } else {
        if (input.getAttribute('id') === 'email') {
            validateEmail(input);
        } else if (input.type === 'password') {
            validatePassword(input);
        } else {
            showSuccess(input);
        }
    }
}

// Validate email input
function validateEmail(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(input.value.toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, 'Email address is not valid');
    }
}

// Validate password inputs
function validatePassword(input) {
    const regex = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,30}$/;
    if (regex.test(input.value.toLowerCase())) {
        if (input.getAttribute('id') === 'confPassword') {
            confirmPassword(input);
        } else {
            showSuccess(input);
        }
    } else {
        showError(
            input,
            'Password must have at least 8 characters, 1 uppercase letter, 1 number and 1 special character'
        );
    }
}

// Confirm password
function confirmPassword(input) {
    if (input.value === pwdInput.value) {
        showSuccess(input);
    } else {
        showError(input, "Psswords don't match");
    }
}

// Show input error message
function showError(input, message) {
    const parent = input.parentElement;
    parent.className = 'inputGroup error';
    input.nextElementSibling.textContent = message;
}

// Show input success state
function showSuccess(input) {
    const parent = input.parentElement;
    parent.className = 'inputGroup success';
}

// Event Listeners
form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const inputs = [usernameInput, emailInput, pwdInput, confPwdInput];
    inputs.forEach(input => validateInputs(input));
});
