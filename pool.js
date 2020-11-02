import pg from 'pg';


function sendPool(db){

    const pool = new pg.Pool ({
        user: 'postgres',
        password: 'postgres',
        database: 'dogs',
        host:   'localhost'
    })

    return pool;

}

export default sendPool()

