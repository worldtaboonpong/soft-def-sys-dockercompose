const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM PRODUCT'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'w1o2r3l4d5',
    database: 'coffeestore'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get('/',(req,res) => {
    res.send('hello from server')
});

app.get('/products', (req,res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err,results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/products/add' , (req,res) => {
    const {name , price} = req.query;
    const INSERT_PRODUCT_QUERY = `INSERT INTO product (name,price) VALUES('${name}',${price})`
    connection.query(INSERT_PRODUCT_QUERY, (err,results)=> {
        if (err) {
            return res.send(err)
        } else {
            return res.send('success')
        }
    })
})

app.listen( 4000, () => {
    console.log('Server listen on port 4000')
});