const db = require ( "./mongoDB.js" )
db.connect( async ( e ) => {
    console.log("Connected...");
    db.getDB().collection("solutions").deleteMany({});
    console.log("Removed All Documents");
    db.getDB().collection("solutions").insertOne(solution);
    console.log("Inserted New");
    const obj = await db.getDB().collection("solutions").findOne({title: 'Viki Learn'});
    console.log(obj);
});

const solution = {
    title : 'Viki Learn',
    id : 1,
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    imgPath : '',
    techUsed: 'html, js',
    image: '/lab/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
};