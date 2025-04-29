const express = require('express');
const router = express.Router();
const db = require('../database'); // importa a conexão

// Rota para buscar dados da energia
router.get('/', (req, res) => {
    const query = 'SELECT * FROM dados_energia ORDER BY data_hora DESC LIMIT 10';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return res.status(500).json({ error: 'Erro ao buscar dados' });
        }
        res.json(results);
    });
});

// Rota para inserir novos dados de energia
router.post('/', (req, res) => {
    const { corrente, tensao, temperatura, energia } = req.body;

    if (!corrente || !tensao || !temperatura || !energia) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    const query = 'INSERT INTO dados_energia (corrente, tensao, temperatura, energia) VALUES (?, ?, ?, ?)';
    const values = [corrente, tensao, temperatura, energia];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).json({ error: 'Erro ao inserir dados' });
        }
        res.status(201).json({ message: 'Dados inseridos com sucesso' });
    });
});

module.exports = router;
