require('./config/config.js');
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/index'))








mongoose.connect(process.env.URLDB, { useNewUrlParser: true, autoIndex: false }, (err, res) => {
    if (err) throw err
    console.log("Base de datos online...")
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT)
})