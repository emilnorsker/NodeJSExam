const router = require( 'express' ).Router();
const { ObjectId } = require('bson');
const { query } = require('express');
const moment = require( 'moment' );
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
            console.log(data);
            data.uploadTime = moment(data.time).format('HH:mm');
            console.log(data.uploadTime);
            const endpoint  = "comment" + data.solutionID;
            io.emit(endpoint, { "comment" : data.comment, "uploadTime": data.uploadTime });
            db.getDB().collection(collection).updateOne( {_id : ObjectId(data.solutionID) }, {$push: { "comments": { 
                "content": data.comment, 
                "author": "anon", 
                "uploadTime": data.uploadTime }
            }});

        socket.on("comment", (data) => {
        });
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

/** upate */
router.post( '/api/solution/:id/update', ( request , response ) => {
    try {
    db.getDB().collection( collection ).updateOne( { id : request.params.id.toString() },  
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

router.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    const id = '<data id="solutionID" data-solution=' + request.params.id + '></data>';
    response.send( header + id + body + footer ); //dangerous! 
} );


module.exports = {
    router, init
};