const router = require("express").Router();
const db = require( '../models/mongoDB.js' );

router.post("/api/problems", (req, res) => {

    res.redirect("/");
});

module.exports = {
    router
};