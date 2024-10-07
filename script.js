document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    let users = JSON.parse(localStorage.getItem('users')) || [];

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        return regex.test(password);
    }

    function showMessage(icon, title, text) {
        return Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonColor: '#3085d6'
        });
    }

    function clearInputs() {
        usernameInput.value = '';
        passwordInput.value = '';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        const user = users.find(u => u.username === username);
        
        if (user && user.password === password) {
            showMessage('success', '¡Éxito!', 'Inicio de sesión exitoso')
            .then(() => {
                localStorage.setItem('currentUser', username);
                window.location.href = 'preferences.html';
            });
        } else {
            showMessage('error', 'Error', 'Usuario o contraseña incorrectos');
        }
    });

    showRegisterBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (users.some(u => u.username === username)) {
            showMessage('warning', 'Advertencia', 'El usuario ya existe');
        } else if (!validatePassword(password)) {
            showMessage('error', 'Error', 'La contraseña debe tener al menos 6 caracteres, incluir una minúscula, una mayúscula y un caracter especial');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            showMessage('success', '¡Éxito!', 'Usuario registrado con éxito')
            .then(() => {
                clearInputs();
            });
        }
    });
});