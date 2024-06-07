const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// Configurando o handlebars como template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Os arquivos públicos ficarão na pasta public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restaurantes'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.post('/create-account', (req, res) => {
    const { name, email, phone, password } = req.body;

    const queryCheckEmail = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(queryCheckEmail, [email], (err, results) => {
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
        connection.query(queryCreateAccount, [name, email, phone, password], (err, result) => {
            if (err) {
                console.error('Erro ao criar conta:', err);
                res.status(500).send('Erro ao criar conta');
                return;
            }

            res.json({ success: true, message: 'Conta criada com sucesso!' });
        });
    });
});


// Tornando a conexão disponível para as rotas
app.set('db', connection);

// Importando e utilizando a rota de parceiros
const parceirosRouter = require('./routes/parceiros');
app.use(parceirosRouter);

// Rota para a página de login
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/cadastroParceiros', (req, res) => {
    res.render('cadastroParceiros');
})

app.get('/entrar', (req, res) => {
    res.render('entrar');
})

app.get('/', (req, res) => {
    const query = 'SELECT * FROM restaurantes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados dos restaurantes:', err);
            res.status(500).send('Erro ao buscar dados dos restaurantes');
            return;
        }
        res.render('home', { restaurantes: results });
    });
});

app.get('/restaurante/:id', (req, res) => {
    const restauranteId = req.params.id;
    const queryRestaurante = 'SELECT * FROM restaurantes WHERE id = ?';
    const queryLanches = 'SELECT * FROM lanches WHERE restaurante_id = ?';
    const queryAcompanhamentos = 'SELECT * FROM acompanhamentos WHERE restaurante_id = ?';
    const querySobremesas = 'SELECT * FROM sobremesas WHERE restaurante_id = ?';

    connection.query(queryRestaurante, [restauranteId], (err, restauranteResult) => {
        if (err) {
            console.error('Erro ao buscar dados do restaurante:', err);
            res.status(500).send('Erro ao buscar dados do restaurante');
            return;
        }

        connection.query(queryLanches, [restauranteId], (err, lanchesResult) => {
            if (err) {
                console.error('Erro ao buscar dados dos lanches:', err);
                res.status(500).send('Erro ao buscar dados dos lanches');
                return;
            }

            connection.query(queryAcompanhamentos, [restauranteId], (err, acompanhamentosResult) => {
                if (err) {
                    console.error('Erro ao buscar dados dos acompanhamentos:', err);
                    res.status(500).send('Erro ao buscar dados dos acompanhamentos');
                    return;
                }

                connection.query(querySobremesas, [restauranteId], (err, sobremesasResult) => {
                    if (err) {
                        console.error('Erro ao buscar dados das sobremesas:', err);
                        res.status(500).send('Erro ao buscar dados das sobremesas');
                        return;
                    }

                    res.render('restaurante', {
                        restaurante: restauranteResult[0],
                        lanches: lanchesResult,
                        acompanhamentos: acompanhamentosResult,
                        sobremesas: sobremesasResult
                    });
                });
            });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
