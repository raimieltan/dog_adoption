import pool from '../pool.js'

function homepage(app, db)
{

    pool.connect( (err, client) => {
        if(err){
            console.log(err)
        }
        else{
            db = client;
        }
    })

    app.get('/', (request, response) => {

        db.query(`SELECT * FROM adoptee` , (err, result) => {
            if(err){
                console.log(err)
                response.writeHead(500);
                response.end('Server crashed')
            }

            else {
                const {rows: adoptee} = result
              
                response.writeHead(200, {
                    'Content-type': 'text/html'
                })
                response.end(
                    //todo 
                    //random dog to adopt
                    //insert dog
                    `
                <html>
                    <body>
                    <h1> Here are the dogs </h1>
                    ${adoptee.length}
                    </body>
                </html>
                
                
                `);
            }
        })

    })
}

export default homepage;