const router = require( "express" ).Router();
const db = require( '../models/mongoDB.js' );

router.post("/api/solutions", (req, res) => {

    res.redirect("/");
});

module.exports = {
    router
};