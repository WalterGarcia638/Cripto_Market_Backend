require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = express.Router();
const request = require('request');

//Crear el servidor de express
const app = express();

//configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


////configuracion
// set up vars
let timestamp = new Date().getTime()
let url = request['url']
let method = request['method']
let contentHash = CryptoJS.SHA512(request['data']).toString(CryptoJS.enc.Hex);

var preSign = [timestamp, url, method, contentHash, ''].join('');
var signature = CryptoJS.HmacSHA512(preSign, pm.collectionVariables.get("BITTREX_API_SECRET")).toString(CryptoJS.enc.Hex);


// Api-Key
pm.request.headers.add({
    key: 'Api-Key',
    value: pm.collectionVariables.get("BITTREX_API_KEY")
});

// Api-Timestamp
pm.request.headers.add({
    key: 'Api-Timestamp',
    value: timestamp
});

// Api-Content-Hash
pm.request.headers.add({
    key: 'Api-Content-Hash',
    value: contentHash
});

// Api-Signature
pm.request.headers.add({
    key: 'Api-Signature',
    value: signature
});
////Configuracion




//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.get('/api/GetMarket', function(req, res, next) {
    request({
        uri: 'https://api.bittrex.com/v3/markets',
    }).pipe(res);
});

app.get('/api/GetAllOrderBook', function(req, res, netx) {
    const marketSymbol = req.body.marketSymbol

    console.log("Consola", marketSymbol)

    request({
        // uri: 'https://api.bittrex.com/v3/markets/1ECO-BTC/orderbook',
        uri: `https://api.bittrex.com/v3/markets/${marketSymbol}/orderbook`,

    }).pipe(res);
});

app.get('/api/GetAllOrderBook', function(req, res, netx) {
    const marketSymbol = req.body.marketSymbol

    console.log("Consola", marketSymbol)

    request({
        // uri: 'https://api.bittrex.com/v3/markets/1ECO-BTC/orderbook',
        uri: `https://api.bittrex.com/v3/markets/${marketSymbol}/orderbook`,

    }).pipe(res);
});





app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});