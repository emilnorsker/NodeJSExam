const express = require( 'express' );
const path = require( 'path' );
const http = require( 'http' );
const fs = require( 'fs' );
const socketIO = require( 'socket.io' );
const db = require( './models/mongoDB.js')

const app = express();
app.use( express.json() );
app.use( express.static( 'public' ) );

let server = http.createServer( app );
const io = socketIO( server );

/** database, replace with proper db once created 
const db = require( __dirname + '/routes/mockDB.js' );
app.use( db.router );
*/

const nav = fs.readFileSync( __dirname + '/public/nav/nav.html', 'utf-8' );
const footer = fs.readFileSync( __dirname + '/public/footer/footer.html', 'utf-8' );

/** home */
const home = fs.readFileSync( __dirname + '/public/home/home.html', 'utf-8' );
app.get( '/', ( request, response ) => {
    response.send( nav + home + footer );
} )

/** solution view  */
const solutionRouter = require( __dirname + '/routes/solution.js' );

const solution = fs.readFileSync( __dirname + '/public/solution/solution.html', 'utf-8' );
solutionRouter.init( footer, solution, nav, io );
app.use( solutionRouter.router ); 

/** chat */
const chat = fs.readFileSync( __dirname + '/public/problems/chat/chat.html', 'utf-8' );
const chatIndex = fs.readFileSync( __dirname + '/public/problems/chat/index.html', 'utf-8' );

app.get( '/assets/chat', ( request, response ) => {
    response.send( chat );
} )



/** server */
var Server ;
db.connect( ( error ) => { 
    if( error ){
        console.log( 'unable to connect to database, error : ', error );
    } 
    else {
        console.log( 'connected to db' );
        Server = server.listen( process.env.PORT || 8080, ( error ) => {
            if ( error ) { console.log( error ); }
            console.log( 'Server is running on port', Server.address().port );
        });
    }
} );


