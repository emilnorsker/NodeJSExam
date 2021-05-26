const router = require( 'express' ).Router();
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
    connect();
}

const connect = () => {
    io.on("connection", (socket) => {
        socket.on("comment", (data) => {
            console.log(data);
            const endpoint  = "comment" + data.solutionID;
            io.emit(endpoint, { "comment" : data.comment });
        });
        socket.on("disconnect", () => {
            console.log("A socket disconnect");
        });
    });

}


/** posts a new solution */
router.post( '/api/solution/add', ( request , response ) => {
    db.getDB().collection( collection ).insert
});

router.get( '/solution/:id', ( request, response ) => { // todo sanitise input
    response.send( header + '<data id="solutionID" data-solution=' + request.params.id + '>' + body + footer ); //dangerous! 
} );


module.exports = {
    router, init
};