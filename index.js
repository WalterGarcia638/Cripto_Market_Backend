require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Crear el servidor de express
const app = express();

app.use(cors());

//Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    });
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});