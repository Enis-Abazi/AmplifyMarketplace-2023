const pswInput = document.querySelector('#psw-input');
const lockIcon = document.querySelector('#lock-icon');
const container = document.querySelector('.container');
const img = document.querySelector('.img');

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
lockIcon.addEventListener('click', showPsw);

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || []);
    const user = users.find(users => users.email === email && users.password === password);
    return user;
}


const loginForm = document.querySelector('#login-my-form');
const emailInput = document.querySelector('#eml-input');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userEmail = emailInput.value;
    localStorage.setItem('users', userEmail);
    window.location.href = 'index.html';
})

const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', function() {
    const emailInput = document.querySelector('#eml-input').value.trim();
    const passwordInput = document.querySelector('#psw-input').value;

    const user = loginUser(emailInput, passwordInput);
    if (user) {
        console.log('registered finally');
        window.location.href = 'index.html'
    } else {
        console.log('invalid email and password')
    }
})