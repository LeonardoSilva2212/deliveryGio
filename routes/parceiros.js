const express = require('express');
const router = express.Router();

router.get('/parceiros', (req, res) => {
    const query = 'SELECT * FROM parceiros';
    const connection = req.app.get('db'); // Usando a conexão do app

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados dos parceiros:', err);
            res.status(500).send('Erro ao buscar dados dos parceiros');
            return;
        }
        res.render('parceiros', { parceiros: results });
    });
});

router.post("/parceiros", (req, res) => {
    const nome = req.body.nome;
    const numero = req.body.numero;
    const email = req.body.email;


    const sql = `INSERT INTO parceiros (nome, numero, email) values ('${nome}', '${numero}', '${email}')`;

    const conn = req.app.get('db');

    conn.query(sql, function (err) {
        if (err) {
          console.log("erro", err);
          return false;
        }
    
        res.redirect("/parceiros");
      })
})


router.delete("/parceiros/:id", (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM parceiros WHERE id = ?`;

    const conn = req.app.get('db');

    conn.query(sql, [id], function (err) {
        if (err) {
            console.log("erro", err);
            res.status(500).send('Erro ao excluir parceiro');
            return;
        }     

        res.redirect("/parceiros");
    }); 
});

// Adicionar esta rota para renderizar o formulário de atualização
router.get('/parceiros/:id/editar', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM parceiros WHERE id = ?';
    const connection = req.app.get('db');

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados do parceiro:', err);
            res.status(500).send('Erro ao buscar dados do parceiro');
            return;
        }
        res.render('editarParceiro', { parceiro: results[0] });
    });
});

// Adicionar esta rota para lidar com a atualização dos dados
router.put('/parceiros/:id', (req, res) => {
    const id = req.params.id;
    const { nome, numero, email } = req.body;
    const query = 'UPDATE parceiros SET nome = ?, numero = ?, email = ? WHERE id = ?';
    const connection = req.app.get('db');

    connection.query(query, [nome, numero, email, id], (err) => {
        if (err) {
            console.error('Erro ao atualizar parceiro:', err);
            res.status(500).send('Erro ao atualizar parceiro');
            return;
        }
        res.redirect('/parceiros');
    });
});



module.exports = router;
