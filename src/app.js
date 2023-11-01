const http = require('http');
const getUsers = require('./modules/users');
const port = 3003;
const server = http.createServer((request, response)=>{
    const url = new URL(request.url, 'http://127.0.0.1:3003');
    console.log(url);
    const searchParams = new URLSearchParams(url.searchParams);
    console.log(searchParams);
    if (searchParams.has('users')){
        response.status = 200;
        response.statusMessage = 'OK';
        response.header = 'Content-Type: application/json';
        response.write(getUsers());
        response.end();
        return;
    }
    if(searchParams.has('hello')){
        switch (searchParams.get('hello')) {
            case '':
                response.status = 400;
                response.statusMessage = 'Bad Request';
                response.header = 'Content-Type: text/plain';
                response.write('enter a name');
                response.end();
                break;
    
            default:
                response.status = 200;
                response.statusMessage = 'OK';
                response.header = 'Content-Type: text/plain';
                response.write('hello, ' + searchParams.get('hello')+'!');
                response.end();
                break;
        }
        return;
    }
    if(!searchParams.size){
        response.status = 200;
        response.statusMessage = 'OK';
        response.header = 'Content-Type: text/plain';
        response.write('Hello, world');
        response.end();
        return;
    }
    response.status = 500;
    response.statusMessage = 'Internal Server Error';
    response.header = 'Content-Type: text/plain';
    response.end();
});
server.listen(port, ()=>{
    console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
})