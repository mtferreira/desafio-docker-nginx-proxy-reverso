const express = require('express');
const mysql   = require('mysql')

const app    = express();
const port   = 3000;
const config = {
    host    : 'db',
    user    : 'root',
    password: 'root',
    database: 'appdb'
};

const connection = mysql.createConnection(config);

let insereNomeAleatorio = () => {
    const nomes = [
        'Clara',
        'Vitória',
        'João Vitor',
        'Octávio',
        'Leandro',
        'Isis',
        'Eva',
        'Diogo',
        'Vinicios',
        'Ezequiel',
        'Laura',
        'Ariela',
        'Benjamin',
        'Thomas',
        'Victor',
        'Estela',
        'Gabriel',
        'Caio',
        'Santiago',
        'Juliano',
        'Beatriz',
        'Maria',
        'Bruna',
        'Joaquim',
        'Leonardo',
        'Maria Luiza',
        'Manuela',
        'Larissa',
        'Leticia',
        'Júlio',
        'Bruno',
        'José',
        'João',
        'Lucas',
        'Marcus',
    ];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    connection.query(`INSERT INTO people (name) values('${nomeAleatorio}')`);
};

app.get('/', (req, res) => {
    insereNomeAleatorio();
    connection.query('SELECT * FROM people', function (err, result, field) {
        let listaNomes = "";
        result.forEach(function (person) {
            listaNomes += `<li>${person.id} - ${person.name}</li>`;
        });
    
        listaNomes = '<ul>'+listaNomes + '</ul>';
        res.send(`<h1>Full Cycle Rocks!</h1> <br/> ${listaNomes}`);
    });
});

app.listen(port, () => {
    console.log(`app node rodando na porta ${port}`);
})