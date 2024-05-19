document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.querySelector('.create-account-form');

    createAccountForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (!name || !email || !phone || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const accountData = {
            name,
            email,
            phone,
            password
        };

        fetch('/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Conta criada com sucesso!');
                window.location.href = '/';
            } else {
                alert('Erro ao criar a conta: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao criar a conta. Por favor, tente novamente.');
        });
    });
});
