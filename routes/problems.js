const router = require( 'express' ).Router();
const db = require( '../models/mongoDB.js' );
const collection = 'problems';

let header = undefined;
let body = undefined;
let footer = undefined;

const init = ( _footer, _body, _header, ) => {
    footer = _footer;
    body = _body;
    header = _header;
}



/** posts a new solution */
router.post( '/api/solution/add', ( request , response ) => {
    db.getDB().collection( collection ).insertOne( 
        request.body.solution
    );
});
router.post( '/api/solution/:id/update', ( request , response ) => {
    console.log( 'id :',  request.params.id );
    console.log( 'ajax :',  request.body );
    db.getDB().collection( collection ).updateOne( { id : Number(request.params.id) },  
        {$set : request.body.solution}
    );
    response.send( 'awesome' );
});

/** gets the solution object from the db */
router.get("/api/solution/get/:id", async ( request , response ) => {
    try {
        const solutionObject = await db.getDB().collection(collection).findMany( {  title : Number( request.params.title ) }, {sort : { upvotes : -1 }} );
        response.send( solutionObject );
    }
    catch ( error ) {
        console.log( error );
        response.render( '<h1> uups, looks like something went wrong </h1>' );
    }
});


router.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    response.send( header + '<data id="solutionID" data-solution=' + request.params.id + '>' + body + footer ); //dangerous!  (xss)
} );


module.exports = {
    router, init
};