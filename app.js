const express = require( 'express' );
const path = require( 'path' );
const http = require( 'http' );
const fs = require( 'fs' );
const socketio = require('socket.io');

const app = express();
app.use( express.json() );
app.use( express.static( 'public' ) );

/** database, replace with proper db once created */
const db = require( __dirname + '/routes/mockDB.js' );
app.use( db.router );

/** start: this should be moved to a route to not clutter the main */
const server1 = http.createServer( app );
const io = socketio( server1 );

io.on('connection', socket => {
    console.log('New WS connection....');
})
/** :end */

const nav = fs.readFileSync( __dirname + '/public/nav/nav.html', 'utf-8' );
const footer = fs.readFileSync( __dirname + '/public/footer/footer.html', 'utf-8' );

const chat = fs.readFileSync( __dirname + '/public/lab/chat/chat.html', 'utf-8' );
const chatIndex = fs.readFileSync( __dirname + '/public/lab/chat/index.html', 'utf-8' );

/** home */
const home = fs.readFileSync( __dirname + '/public/home/home.html', 'utf-8' );
app.get( '/', ( request, response ) => {
    response.send( nav + home + footer );
} )

/** lab */
const lab = fs.readFileSync( __dirname + '/public/lab/lab.html', 'utf-8' );
app.get( '/lab', ( request, response ) => {
    response.send( nav + lab + footer );
} )

/** solution view  */
const solution = fs.readFileSync( __dirname + '/public/solution/solution.html', 'utf-8' );

app.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    response.send( nav + solution + footer );
} )

/** chat */
app.get( '/lab/chat', ( request, response ) => {
    response.send( chat );
} )
 /** lab index chat index? -better naming (i.e. lab/chat/index) */
app.get( '/lab/index', ( request, response ) => {
    response.send( chatIndex );
} )



const server = app.listen( process.env.PORT || 8080, ( error ) => {
    if ( error ) { console.log( error ); }
    console.log( 'Server is running on port', server.address().port );
});