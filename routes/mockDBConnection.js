const router = require("express").Router();


/*
    Solution Schema
        Title - (string)
        Description: (string)
        uploadDate : (date)
        Tech used: (array)
        Image: (string)
        HostedLink: (string)
        GitLink: (string)
        files : [ (file) ]

*/


const projects = [{
        title : 'Viki Learn',
        description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
        uploadDate : new Date("2021-04-08"),
        techUsed: 'html, js',
        image: '/lab/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        files : [ { filename : 'main', filetype : 'js', content: "console.log('hello world')" } ]
    }];




router.post("/api/lab", (req, res) => {
    res.redirect("/");
});

module.exports = {
    router
};