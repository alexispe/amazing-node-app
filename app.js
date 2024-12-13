import express from 'express';
import { createClient } from 'redis';

const app = express();
const PORT = 3000;
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const client = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

await client.connect();

app.get('/', async (req, res) => {
    const value = await client.get('counter');

    if (value === null) {
        await client.set('counter', 0);
    }

    res.send(`
        <h1>Compteur de clics : ${value}</h1>
        <button onclick="fetch('/click').then(() => window.location.reload())">Cliquez-moi</button>
    `);
});

app.get('/click', async (req, res) => {
    let value = await client.get('counter');
    await client.set('counter', parseInt(value)+1);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
