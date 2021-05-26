const express = require( 'express' );
const http = require( 'http' );
const path = require( 'path' );
const fs = require( 'fs' );
const socketIO = require( 'socket.io' );

const app = express();
app.use( express.json() );
app.use( express.static( 'public' ) );
const server = http.createServer(app);

let server = http.createServer( app );
const io = socketIO( server );

/** database, replace with proper db once created 
const db = require( __dirname + '/routes/mockDB.js' );
app.use( db.router );
*/

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
} );

/** solution view  */
const solutionRouter = require( __dirname + '/routes/solution.js' );

const solution = fs.readFileSync( __dirname + '/public/solution/solution.html', 'utf-8' );
solutionRouter.init( footer, solution, nav, io );
app.use( solutionRouter.router ); 

/** chat */
app.get( '/lab/chat', ( request, response ) => {
    response.send( chat );
} )
 /** lab index chat index? -better naming (i.e. lab/chat/index) */
app.get( '/lab/index', ( request, response ) => {
    response.send( chatIndex );
} )

const PORT = 8080 || process.env.PORT;


const db = require( './models/mongoDB.js')

db.connect( ( error ) => { 
    if( error ){
        console.log( 'unable to connect' );
    } 
    else {
        console.log( 'connected to db' );
        const Server = server.listen( process.env.PORT || 8080, ( error ) => {
            if ( error ) { console.log( error ); }
            console.log( 'Server is running on port', Server.address().port );
        });
    }
} );


