
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var http = require('http');
var fs = require('fs');
var path = require('path');

// import { sayHi } from './libs/sayHi.js'
import { create_UUID } from './libs/UUIDv4.js'

const HOST = '0.0.0.0';
const PORT = 5000;

// import Route from './Route.js';
// import Router from './Router.js';

let session_map = {};

function handleRequest(request, response) {
    console.log('request ', request.url);

    var filePath = './dist/public' + request.url;
    if (filePath == './dist/public/') {
        filePath = './dist/public/index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    console.log(`Request: ${filePath}`)
    console.log(`Ext name: ${extname}`)
    
    // let a_uuid = create_UUID();
    // console.log(`UUIDv4 = ${a_uuid}`);

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
    // response.end('Server working properly. Requested URL : ' + request.url)
}

function Helloiew() {
    console.log(`[HelloView] Listening on http://${HOST}:${PORT}/`);
}

var main_server = http.createServer(handleRequest);

main_server.listen({
    host: HOST,
    port: PORT,
    exclusive: true
}, Helloiew);

// let home_route = new Route('Home', '/', Helloiew)
// let all_my_routes = [home_route];

// let x = new Router(all_my_routes, document.getElementById('app'));
// x.handle()