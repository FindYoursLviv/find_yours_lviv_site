require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const postgres = require('postgres');
const db = postgres({ssl: process.env.PGREQUIRESSL});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist','index.html'));
});

app.get("/api/places", async (req, res) =>  {
    res.send(await db`SELECT * FROM place`);
})

app.get("/api/places/:id", async (req, res) =>  {
    const id = req.params.id;
    const places = await db`SELECT * FROM place WHERE id = ${id}`;
    res.send(places);
})

app.listen(8080, ()=> console.log('Server is running on port 8080'));