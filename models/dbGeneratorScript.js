const db = require ( "./mongoDB.js" )
db.connect( async ( e ) => {
    console.log("Connected...");
    db.getDB().collection("solutions").deleteMany({});
    console.log("Removed All Documents");
    //db.getDB().collection("solutions").insertMany(solutions);

    db.getDB().collection("problems").deleteMany({});
    console.log("Removed All Documents");
    //db.getDB().collection("problems").insertMany(problems);
    console.log("Inserted New");
    
    const obj = await db.getDB().collection("solutions").findOne({title: 'Viki Learn'});
    console.log(obj);
});



const problems = [ {
    title :'fake problem',
    description : 'idk how to print to console. very hard. pls help',
    img : '',
    solutions : []
},
];

const solutions = [  {
        problem : 'fakeID',
        title :'Viki Learn',
        //_id : '1',
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
        problem : 'fakeID',
        title :'ATikil0p8 Learn',
        description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
        uploadDate : new Date("2021-04-08"),

        techUsed: 'html, js',
        image: '/assets/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
        files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
    }, {
    problem_id : '60b240ca31055b128815b1e3',
        title :'BTiki Learn',
    description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
    uploadDate : new Date("2021-04-08"),
    techUsed: 'html, js',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome content, <!> // this code should be highligted \n console.log() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
} ,{
    problem_id : '60b240ca31055b128815b1e3',
        title :'C Vkijjyyki Learn',
    description: 'Spring MVC website made for an exam project to showcase the skills learned throughout the semester, with focus on a asynchronus website that requires no page reloads.',
    uploadDate : new Date("2021-04-08"),

    techUsed: 'Spring Boot, JavaScript, AJAX, Json, JQuery',
    image: '/assets/vikiLearn.png',
    hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
    gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
    comments: [ {author: "me", content : "awesome conteqeqweqwent, <!>qweqweshoulqweqwelog() <!>"} ],
    files : [ { filename : 'main.js', content: "console.log('hello world') \n//comment should be grey" }, { filename : 'notMain.js', content: "<script> alert(1) </script>" } ]
}, {
    problem_id : '60b240ca31055b128815b1e3',
        title :'Tikytrji Learn',
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
    problem : 'fakeID',
        title :'Tikqwqeisfdgq Learn',
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
        problem : 'fakeID',
        title :'Vki12312ki Learn',
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
        problem : 'fakeID',
        title :'Tiki Learn',
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
    problem : 'fakeID',
        title :'Tik123i Learn',
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


