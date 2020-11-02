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

        if(request.query.dog){
 
            db.query(`UPDATE adoptee SET adopted = True WHERE id = ${request.query.dog}`)
        }
        db.query(`SELECT * FROM adoptee WHERE adopted=False` , (err, result) => {
            if(err){
                console.log(err)
                response.writeHead(500);
                response.end('Server crashed')
            }

            else {
                const {rows: adoptee} = result

                let allDogs = ""
                
                for( const dog of adoptee){
                    let adoptionStatus = '';
                    if(dog.adopted){
                        adoptionStatus= 'unavailable'
                    }
                    else{
                        adoptionStatus = 'available'
                    }
                    allDogs +=
                     `
                     <div style='
                     border: 1px solid lightblue; 
                     text-align:center;
                     margin-top: 20px;
                     margin-left:auto;
                     margin-right:auto;
                     width: 30%;
                     border-radius: 30px;
                     display:flex;'>

                        <div style="flex:2; ">
                            <img style="border-radius: 180px" width="150px"" src='https://www.randomdoggiegenerator.com/randomdoggie.php?${Math.random()}' alt='doggo pics'/>
                        </div>

                        <div style="
                        flex:2;
                        ">

                         <div style="height: 30%; margin-top:30px;"> 
                                ${dog.name}
                                <br>
                                ${dog.age} year/s old
                                <br>
                                ${dog.gender}
                                <br>
                                ${adoptionStatus}
                                <br>
                                <form action='/adopt' method='GET'>
                                <input style='display:none' type="text" name = 'dog' value="${dog.id}"/>
                                <button type="submit">Adopt Me</button>
                                </form>
                                

                            </div>

                        
                        </div>
                     
                     </div>

                     `
                }
                response.writeHead(200, {
                    'Content-type': 'text/html'
                })
                response.end(
                    `
                <html>
                    <body style='text-align: center'>
                    <h1 > Adoption List </h1>

                    ${allDogs}

                    </body>
                </html>
                
                
                `);
            }
        })

    })
}

export default adoptPage;