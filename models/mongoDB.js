const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectId = require( 'mongodb' ).ObjectID;
const dbName = "solutionDB"
const url = 'mongodb://localhost:27017/'+dbName;
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
};

const state = {
    db : null
}

const connect = (callback) => {
    console.log( 'connecting to db ...' );
    if( state.db ) {
        callback();
    }
    else {
        MongoClient.connect( url, options, (error, client )=> {
            
            if( error ){
                //console.log('here')
                console.log( error );
                callback( error );
            }
            else{
                state.db = client.db(dbName);
                callback();
            }
        } );
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID( _id );
}

const getDB = () => {
    return state.db;
}

module.exports = {
    getDB, connect, getPrimaryKey
}

/*
    Solution Schema
        Title - (string)
        Description: (string)
        uploadDate : (date)
        Tech used: (array)
        Image: (string)
        HostedLink: (string)
        GitLink: (string)
        id : int
        comments : [ {comment:(string), author : (string) } ]
        files : [ {filename : (string), fileContent : (string) } ]

*/

