const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// Configurando o handlebars como template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rota para a página de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Os arquivos públicos ficarão na pasta public
app.use(express.static("public"));

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
                    console.err('Erro ao buscar dados dos acompanhamentos:', err)
                    res.status(500).send('Erro ao buscar dados dos acomapnhamntos');
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
                        sobremesas:sobremesasResult
                });
              })
            })
        });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
