const express = require( 'express' );
const path = require( 'path' );
const http = require( 'http' );
const fs = require( 'fs' );
const socketio = require('socket.io');

const app = express();


app.use( express.static( 'public' ) );
const server1 = http.createServer(app);
const io = socketio(server1);

io.on('connection', socket => {
    console.log('New WS connection....');
})

const nav = fs.readFileSync( __dirname + '/public/nav/nav.html', 'utf-8' );
const footer = fs.readFileSync( __dirname + '/public/footer/footer.html', 'utf-8' );
const home = fs.readFileSync( __dirname + '/public/home/home.html', 'utf-8' );
const lab = fs.readFileSync( __dirname + '/public/lab/lab.html', 'utf-8' );
const chat = fs.readFileSync( __dirname + '/public/lab/chat/chat.html', 'utf-8' );
const chatIndex = fs.readFileSync( __dirname + '/public/lab/chat/index.html', 'utf-8' );
const solution = fs.readFileSync( __dirname + '/public/solution/solution.html', 'utf-8' );

app.get( '/', ( request, response ) => {
    response.send(nav + home + footer );
} )

app.get( '/lab', ( request, response ) => {
    response.send(nav + lab + footer );
} )

app.get( '/solution', ( request, response ) => {
    response.send(nav + solution + footer);
} )

app.get( '/lab/chat', ( request, response ) => {
    response.send(chat);
} )

app.get( '/lab/index', ( request, response ) => {
    response.send(chatIndex);
} )






const server = app.listen( process.env.PORT || 8080, (error) => {
    if ( error ) { console.log( error ); }
    console.log( 'Server is running on port', server.address().port );
});