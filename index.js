const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// Configurando o handlebars como template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
