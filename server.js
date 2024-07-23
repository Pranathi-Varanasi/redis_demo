const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = 3000;

const client = createClient();

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

client.connect().catch((err) => {
    console.error('Failed to connect:', err);
});

app.use(express.json());

app.post('/users', async (req, res) => {
    const { name, phoneNumber } = req.body;
    if (typeof name !== 'string' || typeof phoneNumber !== 'string') {
        return res.status(400).json({ message: 'n and p must be str' });
    }

    const data = await client.get(`user:${name}`);
    let user = data ? JSON.parse(data) : { name, phoneNumbers: [] };

    if (user.phoneNumbers.includes(phoneNumber)) {
        return res.status(400).json({ message: 'number exists' });
    }

    user.phoneNumbers.push(phoneNumber);

    await client.setEx(`user:${name}`, 3600, JSON.stringify(user));
    res.json({ user });
});


app.get('/users/:name', async (req, res) => {
    const { name } = req.params;
    const data = await client.get(`user:${name}`);
    if (data) {
        return res.json(JSON.parse(data));
    }
    res.status(404).json({ message: 'User not found' });
});
app.put('/users/:name', async (req, res) => {
    const { name } = req.params;
    const { phoneNumbers } = req.body;
    if (!Array.isArray(phoneNumbers) || !phoneNumbers.every(num => typeof num === 'string')) {
        return res.status(400).json({ message: 'no.s must be arr of strsss' });
    }

    const user = { name, phoneNumbers };
    await client.setEx(`user:${name}`, 3600, JSON.stringify(user));
    res.json({ message: 'updated', user });
});

app.delete('/users/:name', async (req, res) => {
    const { name } = req.params;
    await client.del(`user:${name}`);
    res.json({ message: 'deleted' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
