import pool from '../pool.js'

function adoptPage(app, db)
{

    pool.connect( (err, client) => {
        if(err){
            console.log(err)
        }
        else{
            db = client;
        }
    })

    app.get('/adopt', (request, response) => {
        response.writeHead(200, {
            'Content-type': 'text/html'
        })

        response.end('Under construction')

    })
}

export default adoptPage;