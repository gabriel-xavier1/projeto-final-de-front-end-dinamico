function register() {
    const newUsername = document.getElementById('username').value;
    const newPassword = document.getElementById('password').value;

    if (localStorage.getItem(newUsername)) {
        alert('Nome de usuário já existe. Escolha outro.');
        return;
    }

    localStorage.setItem(newUsername, newPassword);
    alert('Cadastro realizado com sucesso! Faça o login.');
    window.location.href = 'login.html';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        alert('Login bem-sucedido!');
        window.location.href = 'board.html';
    } else {
        alert('Credenciais incorretas. Tente novamente.');
    }
}
