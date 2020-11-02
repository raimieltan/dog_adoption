import http from 'http';
import url from 'url';
import qs from 'querystring'

function miniExpress(){

    const routes = {
        GET: {},
        POST: {}
    }

    const server = http.createServer( (request, response) => {
        request.query = qs.parse(url.parse(request.url).query)
        const pathName = url.parse(request.url).pathname;
        if(routes[request.method][pathName]){

            routes[request.method][pathName](request, response)

        }
        else {
            response.writeHead(404, {
                'Content-type': 'text/html'
            } );
            response.end(
                `
                <html>
                    <body>
                        <h1>404 Page not found </h1>
                    </body>
                </html>
                `
            )
        }
        
    });


    server.get = (url, handler) => {

        routes['GET'][url] = handler;
    }

    server.post = (url, handler) => {
        routes['POST'][url] = handler;
    }


    return server;


}



export default miniExpress;