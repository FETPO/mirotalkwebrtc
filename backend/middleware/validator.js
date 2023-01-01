'use-strict';

const lowerCase = new RegExp('[a-z]');
const upperCase = new RegExp('[A-Z]');
const numbers = new RegExp('[0-9]');
const specialCharacter = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
const validEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const checkData = (req, res, next) => {
    const { username, email, password } = req.body;
    if (username) {
        const validUsername = isValidUsername(username);
        console.log('Validator', { username: validUsername });
        if (validUsername != true) {
            return res.status(201).json({ message: validUsername });
        }
    }
    if (email) {
        const validMail = isValidEmail(email);
        console.log('Validator', { email: validMail });
        if (validMail != true) {
            return res.status(201).json({ message: validMail });
        }
    }
    if (password) {
        const validPassword = isValidPassword(password);
        console.log('Validator', { password: validPassword });
        if (validPassword != true) {
            return res.status(201).json({ message: validPassword });
        }
    }
    return next();
};

function isValidUsername(username) {
    if (username.length > 20) {
        return '⚠️ The maximum number of username characters must be 20';
    }
    return true;
}

function isValidEmail(email) {
    if (!email.match(validEmail)) {
        return '⚠️ The Email field seems not valid!';
    }
    return true;
}

function isValidPassword(password) {
    if (password.length < 6) {
        return '⚠️ The minimum number of password characters must be 6';
    }
    if (password.length > 36) {
        return '⚠️ The maximum number of password characters must be 36';
    }
    if (
        !password.match(lowerCase) ||
        !password.match(upperCase) ||
        !password.match(numbers) ||
        !password.match(specialCharacter)
    ) {
        return '⚠️ The password must contain lower/upper case, numbers and special character [!,%,&,@,#,$,^,*,?,_,~] es. 👉 Test@123';
    }
    return true;
}

module.exports = checkData;
