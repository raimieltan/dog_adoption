import miniExpress from './mini-express.js';
import pool from './pool.js';
import home from './routes/homepage.js';


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