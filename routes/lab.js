const router = require("express").Router();

router.post("/api/lab", (req, res) => {

    res.redirect("/");
});

module.exports = {
    router
};