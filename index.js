import miniExpress from './mini-express.js';
import pool from './pool.js';
import home from './routes/homepage.js';
import adopt from './routes/adopt.js'
import deposit from './routes/deposit.js'


const app = miniExpress();
let db;


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