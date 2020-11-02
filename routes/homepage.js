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

        db.query(`SELECT * FROM adoptee WHERE adopted=False` , (err, result) => {
            if(err){
                console.log(err)
                response.writeHead(500);
                response.end('Server crashed')
            }

            else {
                const {rows: adoptee} = result

   
                // let random = Math.floor(Math.random() * adoptee.length)
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
                     display:flex'>

                        <div style="flex:2">
                            <img width="240px" src='https://www.randomdoggiegenerator.com/randomdoggie.php?${Math.random()}' alt='doggo pics'/>
                        </div>

                        <div style="
                        border: 1px solid red;
                        flex:2;
                        ">

                            <div style="border:1px solid blue; height: 30%; margin-top:80px;"> 
                                ${dog.name}
                                <br>
                                ${dog.age} year/s old
                                <br>
                                ${dog.gender}
                                <br>
                                ${adoptionStatus}

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
                    <h1 > Paw Cares Adoption Center </h1>
                    <a  href="/adopt">Adopt</a>
                    <a href="/deposit">Deposit</a>

                    ${allDogs}
                    </body>
                </html>
                
                
                `);
            }
        })

    })
}

export default homepage;