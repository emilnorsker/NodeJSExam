const router = require( 'express' ).Router();
const { query } = require('express');
const db = require( '../models/mongoDB.js' );
const collection = 'solutions';

let header = undefined;
let body = undefined;
let footer = undefined;

const init = ( _footer, _body, _header ) => {
    footer = _footer;
    body = _body;
    header = _header;
}

/** posts a new solutions */
router.post( '/api/solutions/add', ( request , response ) => {
    db.getDB().collection( collection ).insertOne( 
        request.body.solutions
    );
});

/** upate */
router.post( '/api/solutions/:id/update', ( request , response ) => {
    try {
    db.getDB().collection( collection ).updateOne( { id : Number(request.params.id) },  
        {$set : request.body.solutions}
    );
    response.send( 'Accepted' );
    } catch ( error ) {
        console.log( error );
        response.send( { error : error } );
    }
});

/** gets the solutions object from the db */
router.get("/api/solutions/get/:id", async ( request , response ) => {
    try {
        const solutionsObject = await db.getDB().collection(collection).findOne( {  id : Number( request.params.id ) } );
        response.send( solutionsObject );
    } catch ( error ) {
        console.log( error );
        response.render( '<h1> uups, looks like something went wrong </h1>' );
    }
});

router.get("/api/solutions/orderBy", async ( request , response ) => {
     try {
        const query = {};
        query[request.query.value] = 1; 
        limit = 200;
        if( request.query.limit ) {
            limit = Number( request.query.limit );
        }

        const solutions = await db.getDB().collection(collection).find({}).sort( query ).limit(limit).toArray();
        response.send( solutions );
    } catch ( error ) {
        console.log( error );
        response.send( { error : error } );
    }
});

router.get( '/solutions/:id', ( request, response ) => { // todo sanitise input
    response.send( header + '<data id="solutionsID" data-solutions=' + request.params.id + '></data>' + body + footer ); //dangerous! 
} );


module.exports = {
    router, init
};