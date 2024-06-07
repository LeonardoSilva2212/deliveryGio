const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/entrar', (req, res) => {
    res.render('entrar');
});

router.post('/create-account', (req, res) => {
    const { name, email, phone, password } = req.body;
    const db = req.app.get('db');

    const queryCheckEmail = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(queryCheckEmail, [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar email existente:', err);
            res.status(500).send('Erro ao verificar email existente');
            return;
        }

        if (results.length > 0) {
            res.json({ success: false, message: 'Este email já está em uso. Por favor, escolha outro.' });
            return;
        }

        const queryCreateAccount = 'INSERT INTO usuarios (name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(queryCreateAccount, [name, email, phone, password], (err, result) => {
            if (err) {
                console.error('Erro ao criar conta:', err);
                res.status(500).send('Erro ao criar conta');
                return;
            }

            res.json({ success: true, message: 'Conta criada com sucesso!' });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).send('Erro ao buscar usuário');
            return;
        }

        if (results.length > 0) {
            res.redirect('/');  // Redirecionar para a home
        } else {
            res.render('entrar', { error: 'Email ou senha incorretos' }); // Exibir erro na página de login
        }
    });
});


module.exports = router;
