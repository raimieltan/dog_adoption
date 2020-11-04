import express from 'express';
import pool from './pool.js';
import home from './routes/homepage.js';
import adopt from './routes/adopt.js'
import deposit from './routes/deposit.js'
import bodyParser from 'body-parser'


const app = express();
let db;

app.use(bodyParser.urlencoded( { extended: true } ))
pool.connect( (err, client) => {
    if(err){
        console.log(err)
    }
    else{
        db = client;
        app.listen(8000, () => {
            console.log('Server has started on port 8000')
        })
    }
})


home(app,db);
adopt(app, db)
deposit(app, db)