const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const porta = 3000;

// Configurar conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'esse', // <-- Coloque sua senha correta aqui
  database: 'solergy'
});

// Middleware para aceitar CORS (libera acesso externo)
app.use(cors());

// Função para gerar simulação de dados
function gerarSimulacao() {
  return {
    corrente: (Math.random() * (10 - 5) + 5).toFixed(2), // Corrente entre 5A e 10A
    tensao: (Math.random() * (240 - 200) + 200).toFixed(2), // Tensão entre 200V e 240V
    temperatura: (Math.random() * (65 - 25) + 25).toFixed(2), // Temperatura entre 25°C e 65°C
    energia: (Math.random() * (5 - 1) + 1).toFixed(2) // Energia entre 1kWh e 5kWh
  };
}

// Rota principal que retorna os dados e também grava no banco
app.get('/api/energia', (req, res) => {
  const dados = gerarSimulacao();
  
app.get('/api/historico', (req, res) => {
    const query = 'SELECT * FROM dados_energia ORDER BY data_hora DESC LIMIT 20';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar histórico:', err);
        return res.status(500).send('Erro ao buscar histórico.');
      }
      res.json(results);
    });
  });
  

  // Inserir dados no banco de dados
  connection.query(
    'INSERT INTO dados_energia (corrente, tensao, temperatura, energia) VALUES (?, ?, ?, ?)',
    [dados.corrente, dados.tensao, dados.temperatura, dados.energia],
    (error, results) => {
      if (error) {
        console.error('❌ Erro ao inserir no banco de dados:', error);
      } else {
        console.log('✅ Dados inseridos no banco de dados!');
      }
    }
  );

  // Retorna os dados para o frontend
  res.json([dados]); // Envia como array para o frontend
});

// Iniciar servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
  });
  

// Testar conexão ao iniciar
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conexão com MySQL estabelecida com sucesso!');
});
