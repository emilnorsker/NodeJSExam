const db = require ( "./mongoDB.js" )
db.connect( async ( e ) => {
    console.log("Connected...");
    db.getDB().collection("solutions").deleteMany({});
    console.log("Removed All Documents");
    db.getDB().collection("solutions").insertMany(solutions);
    console.log("Inserted New");
    const obj = await db.getDB().collection("solutions").findOne({title: 'Viki Learn'});
    console.log(obj);
});

const solutions = [  {
        title : 'Viki Learn',
        id : 1,
        description: 'Spring MVC website made for an exam project to showcase the skills learned throughout the semester, with focus on a asynchronus website that requires no page reloads.',
        uploadDate : new Date("2021-04-08"),
        imgPath : '',
        techUsed: 'Spring Boot, JavaScript, AJAX, Json, JQuery',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F3016%2F1*srSO6S7Q0N-Y9iOwdVah0A.jpeg&f=1&nofb=1',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        comments: [ {author: "me", content : "awesome conteqeqweqwent, <!>qweqweshoulqweqwelog() <!>"} ],
        files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    }, {
        title : 'ATikil0p8 Learn',
        id : 1,
        description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
        uploadDate : new Date("2021-04-08"),

        techUsed: 'html, js',
        image: '/assets/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
        files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    }, {
    title : 'BTiki Learn',
    id : 1,
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    techUsed: 'html, js',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
} ,{
    title : 'C Vkijjyyki Learn',
    id : 1,
    description: 'Spring MVC website made for an exam project to showcase the skills learned throughout the semester, with focus on a asynchronus website that requires no page reloads.',
    uploadDate : new Date("2021-04-08"),

    techUsed: 'Spring Boot, JavaScript, AJAX, Json, JQuery',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome conteqeqweqwent, <!>qweqweshoulqweqwelog() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
}, {
    title : 'Tikytrji Learn',
    id : 1,
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    imgPath : '123',
    techUsed: 'html, js',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
}, {
    title : 'Tikqwqeisfdgq Learn',
    id : 1,
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    imgPath : '123',
    techUsed: 'html, js',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    },{
        title : 'Vki12312ki Learn',
        id : 1,
        description: 'Spring MVC website made for an exam project to showcase the skills learned throughout the semester, with focus on a asynchronus website that requires no page reloads.',
        uploadDate : new Date("2021-04-08"),
        imgPath : '',
        techUsed: 'Spring Boot, JavaScript, AJAX, Json, JQuery',
        image: '/assets/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        comments: [ {author: "me", content : "awesome conteqeqweqwent, <!>qweqweshoulqweqwelog() <!>"} ],
        files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    }, {
        title : 'Tiki Learn',
        id : 1,
        description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
        uploadDate : new Date("2021-04-08"),
        imgPath : '123',
        techUsed: 'html, js',
        image: '/assets/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
        files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    }, {
    title : 'Tik123i Learn',
    id : 1,
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    imgPath : '123',
    techUsed: 'html, js',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
}  
];


