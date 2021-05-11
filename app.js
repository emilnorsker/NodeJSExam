const express = require( 'express' );
const app = express();
const fs = require( 'fs' );

app.use( express.static( 'public' ) );

const header = fs.readFileSync( __dirname + '/public/header/header.html', 'utf-8' );
const footer = fs.readFileSync( __dirname + '/public/footer/footer.html', 'utf-8' );
const home = fs.readFileSync( __dirname + '/public/home/home.html', 'utf-8' );

app.get( '/home', ( request, response ) => {
    response.send( header + home + footer );
} )

app.get( '*', ( request, response ) => {
    response.send( 'hello' );
} )

const server = app.listen( process.env.PORT || 8080, (error) => {
    if ( error ) { console.log( error ); }
    console.log( 'Server is running on port', server.address().port );
});