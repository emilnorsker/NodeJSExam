const router = require("express").Router();

router.post("/api/lab", (req, res) => {
    // todo send email
    res.redirect("/");
});

module.exports = {
    router
};