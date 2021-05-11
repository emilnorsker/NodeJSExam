const express = require( express );
const app = express();

const PORT = env.PORT ;






app.listen( PORT || 8080, (error) => {

    if( error ) { console.log( error ); }

    console.log( 'server is running on PORT' + PORT );

});