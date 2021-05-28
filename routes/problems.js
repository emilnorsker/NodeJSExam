const router = require("express").Router();
const db = require( '../models/mongoDB.js' );

router.post("/api/lab", (req, res) => {

    res.redirect("/");
});

module.exports = {
    router
};