const pswInput = document.querySelector('#psw-input');
const pswInputConfirm = document.querySelector('#psw-input-confirm');
const lockIconConfirm = document.querySelector('#lock-icon-confirm');
const lockIcon = document.querySelector('#lock-icon');
const container = document.querySelector('.container');
const img = document.querySelector('.img');
const blog = document.querySelector('.blog');



container.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 10;
    const yAxis = (window.innerHeight / 2 - e.pageX) / 10;

    img.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
})

container.addEventListener('mouseenter', () => {
    img.style.transform = 'none';
});

container.addEventListener('mouseleave', () => {
    img.style.transition = 'transform 0.5s ease';
    img.style.transform = 'rotateY(0deg) rotateX(0deg)';
})

function showPsw() {
    pswInput.type = lockIcon.classList.contains('fa-unlock') ? "text" : "password";
    lockIcon.classList.toggle('fa-unlock');
}

function showPswConfirm() {
    pswInputConfirm.type = lockIconConfirm.classList.contains('fa-unlock') ? "text" : "password";
    lockIconConfirm.classList.toggle('fa-unlock');
}

lockIcon.addEventListener('click', showPsw);
lockIconConfirm.addEventListener('click', showPswConfirm);

function isUserExist(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

function saveUserData(name, lastName, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (isUserExist(email)) {
        const spanEmail = document.querySelector('#emailExistWarning');
        spanEmail.textContent = 'This Email Already Exists!'
        spanEmail.style.color = 'red';
        spanEmail.style.fontFamily = 'Helvetica';
        spanEmail.style.position = 'absolute';
        spanEmail.style.left = '50px';
        spanEmail.style.bottom = '0';
        return;
    }
    const user = { name, lastName, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users))
}

const loginBtn = document.querySelector('#login-btn');
const firstNameInput = document.querySelector('#firstName-input');
const lastNameInput = document.querySelector('#lastName-input');
const emailInput = document.querySelector('#eml-input');
const passwordInput = document.querySelector('#psw-input');
const passwordConfirmInput = document.querySelector('#psw-input-confirm');


const firstName = firstNameInput.value.trim();
const lastName = lastNameInput.value.trim();
const email = emailInput.value.trim();
const password = passwordInput.value;
const passwordConfirm = passwordConfirmInput.value;

const fillName = document.querySelector('#pleaseFillName');
const fillLastName = document.querySelector('#pleaseFillLastName');
const fillEmail = document.querySelector('#pleaseFillEmail');
const fillPassword = document.querySelector('#pleaseFillPassword');
const fillPasswordConfirm = document.querySelector('#pleaseFillPasswordConfirm');



if (firstName.length > 3) {
    fillName.textContent = ''
}
if (lastName.length > 3) {
    fillLastName.textContent = '';
}
if (email.length > 8) {
    fillEmail.textContent = '';
}
if (password.length > 8) {
    fillPassword.textContent = '';
}
if (passwordConfirm.length > 8) {
    fillPasswordConfirm.textContent = '';
}

let accountCreated = false;

document.addEventListener('click', function() {
    const animationAfterSignUp = document.querySelector('.animationAfterSignUp');
    const title = document.querySelector('.title');
    const inputsFlex = document.querySelector('.inputs-flex');
    const btn = document.querySelector('.btn');
    const alreadyAccountSpan = document.querySelector('#already-account');

    const loginBtn = document.querySelector('#login-btn');
    const firstNameInput = document.querySelector('#firstName-input');
    const lastNameInput = document.querySelector('#lastName-input');
    const emailInput = document.querySelector('#eml-input');
    const passwordInput = document.querySelector('#psw-input');
    const passwordConfirmInput = document.querySelector('#psw-input-confirm');

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    if (isUserExist(email)) {
        accountCreated = true;
    }


    const fillName = document.querySelector('#pleaseFillName');
    const fillLastName = document.querySelector('#pleaseFillLastName');
    const fillEmail = document.querySelector('#pleaseFillEmail');
    const fillPassword = document.querySelector('#pleaseFillPassword');
    const fillPasswordConfirm = document.querySelector('#pleaseFillPasswordConfirm');


    if (firstName.length > 3) {
        fillName.textContent = ''
    } else if (firstName.length < 3) {
        fillName.style.animation = 'shake 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
    if (lastName.length > 3) {
        fillLastName.textContent = '';
    } else {
        fillLastName.style.animation = 'shake 0.3s ease-out';
    }
    if (email.length > 8) {
        fillEmail.textContent = '';
    } else {
        fillEmail.style.animation = 'shake 0.3s ease-out';
    }
    if (password.length > 8) {
        fillPassword.textContent = '';
    } else {
        fillPassword.style.animation = 'shake 0.3s ease-out';
    }
    if (passwordConfirm.length > 8) {
        fillPasswordConfirm.textContent = '';
    } else {
        fillPasswordConfirm.style.animation = 'shake 0.3s ease-out';
    }


    loginBtn.addEventListener('click', function() {


        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const passwordConfirm = passwordConfirmInput.value;
        const fillName = document.querySelector('#pleaseFillName');
        const fillLastName = document.querySelector('#pleaseFillLastName');
        const fillEmail = document.querySelector('#pleaseFillEmail');
        const fillPassword = document.querySelector('#pleaseFillPassword');
        const fillPasswordConfirm = document.querySelector('#pleaseFillPasswordConfirm');
        const spanPassword = document.querySelector('#passwordDontMatch');

        if (firstName === '' || lastName === '' || email === '' || password === '' || passwordConfirm === '') {
            fillName.textContent = 'Please Fill Name';
            fillName.style.animation = 'popUp 0.3s ease-in'
            fillLastName.textContent = 'Please Fill Lastname';
            fillLastName.style.animation = 'popUp 0.3s ease-in';
            fillEmail.textContent = 'Please Fill Email';
            fillEmail.style.animation = 'popUp 0.3s ease-in';
            fillPassword.textContent = 'Please Fill Password';
            fillPassword.style.animation = 'popUp 0.3s ease-in';
            fillPasswordConfirm.textContent = 'Please Fill Password';
            fillPasswordConfirm.style.animation = 'popUp 0.3s ease-in';
            return;
        }
        if (password !== passwordConfirm) {
            spanPassword.textContent = 'Passwords do not match';
            spanPassword.style.color = 'red';
            spanPassword.style.fontFamily = "Helvetica";
            spanPassword.style.position = 'absolute';
            spanPassword.style.left = '50px'
            spanPassword.style.top = '0';
            return;
        } else {
            spanPassword.textContent = '';
        }
        if (password === '' && passwordConfirm === '') {
            spanPassword.textContent = '';
            spanPassword.innerHTML = '';
        }

        if (!isUserExist(email)) {
            const animationAfterSignUp = document.querySelector('.animationAfterSignUp');
            console.log(animationAfterSignUp)
            const title = document.querySelector('.title');
            const inputsFlex = document.querySelector('.inputs-flex');
            const btn = document.querySelector('.btn');
            const alreadyAccountSpan = document.querySelector('#already-account');
            saveUserData(firstName, lastName, email, password);
            title.style.display = 'none ';
            inputsFlex.style.display = 'none ';
            btn.style.display = 'none ';
            animationAfterSignUp.style.display = 'block';
            alreadyAccountSpan.innerHTML = ' Now Please Log In Here  <i class="fa-solid fa-arrow-down"></i>'
            console.log('Account Created Succesfully');
            accountCreated = true;
        } else {
            console.log('Email Already Exists')
        }
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        passwordConfirmInput.value = '';
    });
    // if (isUserExist(email)) {
    //     console.log('Email already exists');
    //     return;
    // }
    // if (accountCreated) {
    //     const animationAfterSignUp = document.querySelector('.animationAfterSignUp');
    //     const title = document.querySelector('.title');
    //     const inputsFlex = document.querySelector('.inputs-flex');
    //     const btn = document.querySelector('.btn');
    //     const alreadyAccountSpan = document.querySelector('#already-account');
    //     title.style.display = 'block';
    //     inputsFlex.style.display = 'block';
    //     btn.style.display = 'block';
    //     animationAfterSignUp.style.display = 'none';
    // }
});