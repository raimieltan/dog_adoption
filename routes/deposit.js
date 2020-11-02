import pool from '../pool.js'

function depositPage(app, db)
{

    pool.connect( (err, client) => {
        if(err){
            console.log(err)
        }
        else{
            db = client;
        }
    })

    app.get('/deposit', (request, response) => {
        response.writeHead(200, {
            'Content-type': 'text/html'
        })

        response.end('Under construction')

    })
}

export default depositPage;