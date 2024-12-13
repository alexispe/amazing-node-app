const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});


app.get('/', (req, res) => {
    client.incr('counter', (err, counter) => {
        if (err) {
            res.status(500).send('Erreur avec Redis.');
            return;
        }
        res.send(`
            <h1>Compteur de clics : ${counter}</h1>
            <button onclick="fetch('/click').then(() => window.location.reload())">Cliquez-moi</button>
        `);
    });
});

app.get('/click', (req, res) => {
    if (client.get('counter') === null) {
        client.set('counter', 0);
    }

    client.incr('counter', (err) => {
        if (err) {
            res.status(500).send('Erreur avec Redis.');
        } else {
            res.status(200).send('OK');
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
