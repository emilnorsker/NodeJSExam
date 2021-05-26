const router = require( 'express' ).Router();
const db = require( '../models/mongoDB.js' );
const collection = 'solutions';
const moment = require( 'moment' );

let io = undefined;
let header = undefined;
let body = undefined;
let footer = undefined;

const init = ( _footer, _body, _header, _io) => {
    footer = _footer;
    body = _body;
    header = _header;
    io = _io;
    connect();
}

const connect = () => {
    io.on("connection", (socket) => {
        socket.on("comment", async (data) => {
            console.log(data);
            data.uploadTime = moment(data.time).format('HH:mm');
            console.log(data.uploadTime);
            const endpoint  = "comment" + data.solutionID;
            io.emit(endpoint, { "comment" : data.comment, "uploadTime": data.uploadTime });
            db.getDB().collection(collection).updateOne({"id": 1}, {$push: { "comments": { 
                "content": data.comment, 
                "author": "anon", 
                "uploadTime": data.uploadTime }
            }});
          
        });
        socket.on("disconnect", () => {
        console.log("A socket disconnect");
        });
    });
}

router.get("/api/solution/get/:id", async ( request , response ) => {
    const solutionObject = await db.getDB().collection(collection).findOne( {} );
    console.log( solutionObject );
    response.send( solutionObject );
});


/** posts a new solution */
router.post( '/api/solution/add', ( request , response ) => {
    db.getDB().collection( collection ).insertOne( 
        request.body.solution
    );
});

router.get("/api/solution/get/:id", async ( request , response ) => {
    const solutionObject = await db.getDB().collection(collection).findOne( {} );
    console.log( solutionObject );
    response.send( solutionObject );
});


router.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    response.send( header + '<data id="solutionID" data-solution=' + request.params.id + '>' + body + footer ); //dangerous! 
} );


module.exports = {
    router, init
};