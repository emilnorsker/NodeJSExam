const router = require( 'express' ).Router();
const { ObjectId } = require('bson');
const { query } = require('express');
const moment = require( 'moment' );
const { Db } = require('mongodb');
const db = require( '../models/mongoDB.js' );
const collection = 'solutions';

let io = undefined;
let header = undefined;
let body = undefined;
let footer = undefined;

const init = ( _footer, _body, _header, _io) => {
    footer = _footer;
    body = _body;
    header = _header;
    io = _io;
    defineSocketBehavior();
}

const defineSocketBehavior = () => {
    io.on("connection", (socket) => {
        socket.on("comment", async (data) => {
            data.uploadTime = moment(data.time).utcOffset(2).format('HH:mm');
            console.log(data.uploadTime);
            const endpoint  = "comment" + data.solutionID;
            
            io.emit(endpoint, { "content" : data.comment, name: 'anon', "uploadTime": data.uploadTime });
            db.getDB().collection(collection).updateOne( {_id : ObjectId(data.solutionID) }, {$push: { "comments": { 
                "content": data.comment, 
                "name": "anon", 
                "uploadTime": data.uploadTime }
           }});

        socket.on("disconnect", () => {
        console.log("A socket disconnect");
            console.log("A socket disconnect");
        });
    } ) } );
}

/** posts a new solution */
router.post( '/api/solution/add', ( request , response ) => {
    db.getDB().collection( collection ).insertOne( 
        request.body.solution
    );
});

/** update */
router.post( '/api/update/solution/:id/', ( request , response ) => {
    try {
    db.getDB().collection( collection ).updateOne( { _id : ObjectId(request.params.id)},  
        {$set : request.body.solution}
    );
    response.send( 'Accepted' );
    } catch ( error ) {
        console.log( error );
        response.send( { error : error } );
    }
});

/** gets the solution object from the db */
router.get("/api/solution/get/:id", async ( request , response ) => {
    try {
        const solutionObject = await db.getDB().collection(collection).findOne( {  _id : ObjectId(request.params.id)  } );
        response.send( solutionObject );
        
    } catch ( error ) {
        console.log( error );
        response.render( '<h1> uups, looks like something went wrong </h1>' );
    }
});

/** order by given field  */
router.get("/api/solution/orderBy", async ( request , response ) => {
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

router.post( '/upload/solution/', async (request, response) => {
    const check = await db.getDB().collection( collection ).find( request.body.solution ).toArray().length
    if ( check > 0 ){
         response.status(500).send("Error: This solution already exists, change parameters" ); 
    }
    await db.getDB().collection( collection ).insertOne( request.body.solution );
    const solution = await db.getDB().collection( collection ).findOne( request.body.solution );
    response.send("/solution/" + solution._id);
});

router.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    const id = '<data id="solutionID" data-solution=' + request.params.id + '></data>';
    response.send( header + id + body + footer ); //dangerous! 
} );

module.exports = {
    router, init
};