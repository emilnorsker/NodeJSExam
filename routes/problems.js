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
router.post( '/api/problem/add', ( request , response ) => {
    db.getDB().collection( collection ).insertOne( 
        request.body.problem
    );
});


router.post( '/upload/problem/', async (request, response) => {
    console.log( request.body );
    const check = await db.getDB().collection( collection ).find( request.body.problem ).toArray().length
    if ( check > 0 ){
         response.status(500).send("Error: This problem already exists, change parameters" ); 
    }
    await db.getDB().collection( collection ).insertOne( request.body.problem );
    const problem = await db.getDB().collection( collection ).findOne( request.body.problem );
    console.log(problem);
    response.send("/solutions/" + problem._id);
});

router.get("/api/problems/search", async ( request , response ) => {
        try {
           const problems = await db.getDB().collection(collection).find({
            "$text": {
              "$search": request.query.text
            } } ).toArray();

            response.send( problems );
        } catch ( error ) {
           console.log( error );
           response.send( { error : error } );
       }
    });


router.get("/api/problems/orderBy", async ( request , response ) => {
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

router.get( '/problems', ( request, response ) => {
    response.send( header + body + footer );
})



module.exports = {
    router, init
};