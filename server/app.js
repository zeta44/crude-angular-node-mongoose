const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controller');
const product_controller = require('./product_controller');

const app = express();
const port = 3000;
const db = "mongodb+srv://<SEU USUARIO:SUA SENHA@cluster0.pdhkp.mongodb.net/aplicacao_http?retryWrites=true&w=majority"

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, sucess)=>{
    if (err) {
        console.log(`Falha na conexão ao BD`);
    }
    console.log(`Banco de dados conectado`);
})

app.use('/departments', department_controller);
app.use('/products', product_controller)


app.listen(port, ()=>{
    console.log(`servidor started on port ${port}`);
    
})



