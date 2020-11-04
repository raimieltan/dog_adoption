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

    app.post('/submit', (request, response) => {

            db.query(`INSERT into adoptee values(default, '${request.body.name}', ${request.body.age}, '${request.body.gender}', False )`, 
            (err, result) => {
                if(err){
                    response.writeHead(500);
                    response.end('Server crashed with error ' + err)
                }

                else {
                    response.writeHead(302, {
                        'Location':'/'
                    })

                    response.end()

                }
            }
            )

        
    })

    app.get('/deposit', (request, response) => {
        response.writeHead(200, {
            'Content-type': 'text/html'
        })

        response.end(
        `
        
        <html>
            <body style="text-align: center">

                <h1> Adoption Form </h1>
                <form action='/submit' method="POST">

                    <input type="text" name="name" placeholder="doggo's name"/>
                    <input type="number" name="age" placeholder="doggo's age"/>
                    <select name="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    <br>
                    <button style="margin-top:10px" type="submit">Say Good Bye</button>
                </form>
            
            </body>
        
        
        </html>

        `
        
        )

    })
}

export default depositPage;