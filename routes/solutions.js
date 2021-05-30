const router = require( 'express' ).Router();
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

router.get("/api/solutions/getSolutionsByProblem", async ( request , response ) => {
    try {
        const solutions = await db.getDB().collection(collection).find( { problem : request.query.id.toString() } ).toArray();
        console.log(solutions)
        response.send( solutions );
    } catch ( error ) {
        console.log( error );
        response.send( { error : error } );
    }
});

router.get( '/solutions/:id', ( request, response ) => { // todo sanitise input
    const id = '<data id="problem-id" data-problem-id=' + request.params.id + '></data>';
    response.send( header + id + body + footer ); //dangerous! 
} );


module.exports = {
    router, init
};