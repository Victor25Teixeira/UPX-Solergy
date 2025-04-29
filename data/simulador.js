const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'esse', // <-- coloque a sua senha do MySQL
  database: 'solergy'
});

function gerarValor(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function inserirDadosSimulados() {
  const corrente = gerarValor(0, 20);
  const tensao = gerarValor(200, 240);
  const temperatura = gerarValor(20, 60);
  const energia = gerarValor(0, 5);

  const query = 'INSERT INTO dados_energia (corrente, tensao, temperatura, energia) VALUES (?, ?, ?, ?)';
  const values = [corrente, tensao, temperatura, energia];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Erro ao inserir dados simulados:', err);
    } else {
      console.log(`✅ Inserido: Corrente ${corrente}A, Tensão ${tensao}V, Temp ${temperatura}°C, Energia ${energia}kWh`);
    }
  });
}

// Executa a cada 5 segundos
setInterval(inserirDadosSimulados, 5000);
