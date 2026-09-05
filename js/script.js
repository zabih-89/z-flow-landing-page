/* =========================================================
   Z_FLOW - MAIN JAVASCRIPT
   Task 2: Interactive Form
   Task 3: Basic DOM Manipulation - Counter
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}


/* =========================================================
   2. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
   ========================================================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    });
});


/* =========================================================
   3. CURRENT YEAR
   ========================================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   4. FORM ELEMENTS
   ========================================================= */

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
   5. VALIDATION HELPER FUNCTIONS
   ========================================================= */

function setError(input, errorElement, message) {
    if (input) {
        input.classList.add("error");
        input.classList.remove("valid");
    }

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add("show");
    }
}


function setValid(input, errorElement) {
    if (input) {
        input.classList.remove("error");
        input.classList.add("valid");
    }

    if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("show");
    }
}


/* =========================================================
   6. NAME VALIDATION
   ========================================================= */

function validateName() {
    if (!nameInput) return false;

    const name = nameInput.value.trim();

    if (name === "") {
        setError(nameInput, nameError, "Please enter your name.");
        return false;
    }

    if (name.length < 2) {
        setError(
            nameInput,
            nameError,
            "Your name must be at least 2 characters."
        );
        return false;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        setError(
            nameInput,
            nameError,
            "Please enter a valid name."
        );
        return false;
    }

    setValid(nameInput, nameError);
    return true;
}


/* =========================================================
   7. EMAIL VALIDATION
   ========================================================= */

function validateEmail() {
    if (!emailInput) return false;

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        setError(
            emailInput,
            emailError,
            "Please enter your email address."
        );
        return false;
    }

    if (!emailPattern.test(email)) {
        setError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
        return false;
    }

    setValid(emailInput, emailError);
    return true;
}


/* =========================================================
   8. PHONE VALIDATION
   ========================================================= */

function validatePhone() {
    if (!phoneInput) return false;

    const phone = phoneInput.value.trim();

    const phonePattern = /^[+]?[0-9\s()-]{7,20}$/;

    if (phone === "") {
        setError(
            phoneInput,
            phoneError,
            "Please enter your phone number."
        );
        return false;
    }

    if (!phonePattern.test(phone)) {
        setError(
            phoneInput,
            phoneError,
            "Please enter a valid phone number."
        );
        return false;
    }

    setValid(phoneInput, phoneError);
    return true;
}


/* =========================================================
   9. PASSWORD VALIDATION
   ========================================================= */

function validatePassword() {
    if (!passwordInput) return false;

    const password = passwordInput.value;

    if (password === "") {
        setError(
            passwordInput,
            passwordError,
            "Please enter a password."
        );
        return false;
    }

    if (password.length < 8) {
        setError(
            passwordInput,
            passwordError,
            "Password must be at least 8 characters."
        );
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        setError(
            passwordInput,
            passwordError,
            "Password must contain at least one uppercase letter."
        );
        return false;
    }

    if (!/[a-z]/.test(password)) {
        setError(
            passwordInput,
            passwordError,
            "Password must contain at least one lowercase letter."
        );
        return false;
    }

    if (!/[0-9]/.test(password)) {
        setError(
            passwordInput,
            passwordError,
            "Password must contain at least one number."
        );
        return false;
    }

    setValid(passwordInput, passwordError);
    return true;
}


/* =========================================================
   10. PASSWORD STRENGTH
   ========================================================= */

function updatePasswordStrength() {
    if (!passwordInput || !passwordStrength) return;

    const password = passwordInput.value;

    passwordStrength.classList.remove("weak", "medium", "strong");

    if (password.length === 0) {
        passwordStrength.textContent = "";
        return;
    }

    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    if (strength <= 2) {
        passwordStrength.textContent = "Weak password";
        passwordStrength.classList.add("weak");
    } else if (strength <= 4) {
        passwordStrength.textContent = "Medium password";
        passwordStrength.classList.add("medium");
    } else {
        passwordStrength.textContent = "Strong password";
        passwordStrength.classList.add("strong");
    }
}


/* =========================================================
   11. SHOW / HIDE PASSWORD
   ========================================================= */

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        passwordToggle.textContent = isPassword
            ? "Hide"
            : "Show";
    });
}


/* =========================================================
   12. REAL-TIME FORM VALIDATION
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

    passwordInput.addEventListener("input", () => {
        updatePasswordStrength();

        if (passwordInput.value.length > 0) {
            validatePassword();
        }
    });
}


/* =========================================================
   13. FORM SUBMISSION
   ========================================================= */

if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();

        if (
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isPasswordValid
        ) {
            if (successMessage) {
                successMessage.textContent =
                    "Your account has been created successfully!";
                successMessage.classList.add("show");
            }

            signupForm.reset();

            if (passwordStrength) {
                passwordStrength.textContent = "";
                passwordStrength.classList.remove(
                    "weak",
                    "medium",
                    "strong"
                );
            }

            if (nameInput) {
                nameInput.classList.remove("valid", "error");
            }

            if (emailInput) {
                emailInput.classList.remove("valid", "error");
            }

            if (phoneInput) {
                phoneInput.classList.remove("valid", "error");
            }

            if (passwordInput) {
                passwordInput.classList.remove("valid", "error");
            }
        }
    });
}


/* =========================================================
   14. CLEAR SUCCESS MESSAGE WHEN USER STARTS AGAIN
   ========================================================= */

if (signupForm && successMessage) {
    signupForm.addEventListener("input", () => {
        successMessage.classList.remove("show");
    });
}


/* =========================================================
   15. TASK 3 - BASIC DOM MANIPULATION
   COUNTER APPLICATION
   ========================================================= */

const counterValue = document.querySelector("#counterValue");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");

const counterStatus = document.querySelector("#counterStatus");
const counterDisplay = document.querySelector(".counter-display");

let count = 0;


/* ---------------------------------------------------------
   UPDATE COUNTER DISPLAY
   --------------------------------------------------------- */

function updateCounter() {
    if (!counterValue) return;

    // Update the number displayed on the page
    counterValue.textContent = count;

    // Disable the decrease button when counter reaches zero
    if (decrementBtn) {
        decrementBtn.disabled = count === 0;
    }

    // Small visual animation whenever the value changes
    if (counterDisplay) {
        counterDisplay.classList.remove("updated");

        // Force browser to restart the animation
        void counterDisplay.offsetWidth;

        counterDisplay.classList.add("updated");
    }
}


/* ---------------------------------------------------------
   INCREMENT
   --------------------------------------------------------- */

function incrementCounter() {
    count++;

    updateCounter();

    if (counterStatus) {
        counterStatus.textContent = "Counter increased.";
    }
}


/* ---------------------------------------------------------
   DECREMENT
   --------------------------------------------------------- */

function decrementCounter() {

    // Prevent the counter from going below zero
    if (count === 0) {
        if (counterStatus) {
            counterStatus.textContent =
                "The counter cannot go below zero.";
        }

        return;
    }

    count--;

    updateCounter();

    if (counterStatus) {
        counterStatus.textContent = "Counter decreased.";
    }
}


/* ---------------------------------------------------------
   RESET
   --------------------------------------------------------- */

function resetCounter() {
    count = 0;

    updateCounter();

    if (counterStatus) {
        counterStatus.textContent = "Counter has been reset.";
    }
}


/* ---------------------------------------------------------
   COUNTER EVENT LISTENERS
   --------------------------------------------------------- */

if (
    counterValue &&
    incrementBtn &&
    decrementBtn &&
    resetBtn
) {
    incrementBtn.addEventListener("click", incrementCounter);

    decrementBtn.addEventListener("click", decrementCounter);

    resetBtn.addEventListener("click", resetCounter);

    // Display the initial value
    updateCounter();
}