/* =========================================================
   Z_FLOW
   Interactive Landing Page + Form Validation
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

const currentYear = document.querySelector("#current-year");

const signupForm = document.querySelector("#signup-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const phoneError = document.querySelector("#phone-error");
const passwordError = document.querySelector("#password-error");

const successMessage = document.querySelector("#success-message");


const passwordToggle = document.querySelector("#password-toggle");

const passwordStrength = document.querySelector("#password-strength");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* =========================================================
   3. CLOSE MOBILE MENU AFTER LINK CLICK
   ========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navigation || !menuButton) {
            return;
        }

        navigation.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* =========================================================
   4. CURRENT YEAR
   ========================================================= */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================================
   5. VALIDATION HELPERS
   ========================================================= */

function showError(input, errorElement, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    errorElement.textContent = message;

}


function showValid(input, errorElement) {

    input.classList.remove("invalid");

    input.classList.add("valid");

    errorElement.textContent = "";

}


function clearValidation(input, errorElement) {

    input.classList.remove("invalid");
    input.classList.remove("valid");

    errorElement.textContent = "";

}


/* =========================================================
   6. NAME VALIDATION
   ========================================================= */

function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {

        showError(
            nameInput,
            nameError,
            "Please enter your full name."
        );

        return false;
    }


    if (name.length < 2) {

        showError(
            nameInput,
            nameError,
            "Your name should contain at least 2 characters."
        );

        return false;
    }


    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {

        showError(
            nameInput,
            nameError,
            "Please enter a valid name."
        );

        return false;
    }


    showValid(nameInput, nameError);

    return true;
}


/* =========================================================
   7. EMAIL VALIDATION
   ========================================================= */

function validateEmail() {

    const email = emailInput.value.trim();

    if (email === "") {

        showError(
            emailInput,
            emailError,
            "Please enter your email address."
        );

        return false;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );

        return false;
    }


    showValid(emailInput, emailError);

    return true;
}


/* =========================================================
   8. PHONE VALIDATION
   ========================================================= */

function validatePhone() {

    const phone = phoneInput.value.trim();

    if (phone === "") {

        showError(
            phoneInput,
            phoneError,
            "Please enter your phone number."
        );

        return false;
    }


    const phonePattern =
        /^[+]?[\d\s()-]{7,20}$/;


    if (!phonePattern.test(phone)) {

        showError(
            phoneInput,
            phoneError,
            "Please enter a valid phone number."
        );

        return false;
    }


    showValid(phoneInput, phoneError);

    return true;
}


/* =========================================================
   9. PASSWORD VALIDATION
   ========================================================= */

function validatePassword() {

    const password = passwordInput.value;

    if (password === "") {

        showError(
            passwordInput,
            passwordError,
            "Please create a password."
        );

        return false;
    }


    if (password.length < 8) {

        showError(
            passwordInput,
            passwordError,
            "Password must be at least 8 characters long."
        );

        return false;
    }


    if (!/[A-Z]/.test(password)) {

        showError(
            passwordInput,
            passwordError,
            "Password must contain at least one uppercase letter."
        );

        return false;
    }


    if (!/[a-z]/.test(password)) {

        showError(
            passwordInput,
            passwordError,
            "Password must contain at least one lowercase letter."
        );

        return false;
    }


    if (!/[0-9]/.test(password)) {

        showError(
            passwordInput,
            passwordError,
            "Password must contain at least one number."
        );

        return false;
    }


    showValid(passwordInput, passwordError);

    return true;
}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function updatePasswordStrength() {

    const password = passwordInput.value;

    if (!password) {

        passwordStrength.textContent = "";

        passwordStrength.className = "password-strength";

        return;
    }


    let strength = 0;


    // Length
    if (password.length >= 8) {
        strength++;
    }


    // Uppercase
    if (/[A-Z]/.test(password)) {
        strength++;
    }


    // Lowercase
    if (/[a-z]/.test(password)) {
        strength++;
    }


    // Number
    if (/[0-9]/.test(password)) {
        strength++;
    }


    // Special character
    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    passwordStrength.className = "password-strength";


    if (strength <= 2) {

        passwordStrength.textContent =
            "Password strength: Weak";

        passwordStrength.classList.add("weak");

    } else if (strength <= 4) {

        passwordStrength.textContent =
            "Password strength: Medium";

        passwordStrength.classList.add("medium");

    } else {

        passwordStrength.textContent =
            "Password strength: Strong";

        passwordStrength.classList.add("strong");

    }

}

/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener("click", () => {

        const passwordIsVisible =
            passwordInput.type === "text";


        if (passwordIsVisible) {

            passwordInput.type = "password";

            passwordToggle.textContent = "Show";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        } else {

            passwordInput.type = "text";

            passwordToggle.textContent = "Hide";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        }

    });

}
/* =========================================================
   10. REAL-TIME VALIDATION
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("blur", validateName);

}


if (emailInput) {

    emailInput.addEventListener("blur", validateEmail);

}


if (phoneInput) {

    phoneInput.addEventListener("blur", validatePhone);

}


if (passwordInput) {

    passwordInput.addEventListener("blur", validatePassword);

}


/* =========================================================
   11. LIVE PASSWORD VALIDATION
   ========================================================= */

if (passwordInput) {

    passwordInput.addEventListener("input", () => {

        updatePasswordStrength();


        if (passwordInput.value.length > 0) {

            validatePassword();

        } else {

            clearValidation(
                passwordInput,
                passwordError
            );

        }

    });

}


/* =========================================================
   12. FORM SUBMISSION
   ========================================================= */

if (signupForm) {

    signupForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const isNameValid = validateName();

        const isEmailValid = validateEmail();

        const isPhoneValid = validatePhone();

        const isPasswordValid = validatePassword();


        const formIsValid =
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isPasswordValid;


        if (!formIsValid) {

            successMessage.classList.remove("show");

            return;

        }


        /*
         * Prevent the form from being submitted
         * to a server because this is a front-end
         * demonstration.
         */

        successMessage.textContent =
            `Thanks, ${nameInput.value.trim()}! ` +
            `Your account details look good. ` +
            `You're ready to get started with Z_Flow.`;


        successMessage.classList.add("show");


        /*
         * Reset the form after successful validation.
         */

        signupForm.reset();


        document
            .querySelectorAll(".form-group input")
            .forEach((input) => {

                input.classList.remove("valid");
                input.classList.remove("invalid");

            });


        document
            .querySelectorAll(".error-message")
            .forEach((error) => {

                error.textContent = "";

            });

    });

}