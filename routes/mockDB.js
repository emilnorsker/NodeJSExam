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


const solutions = [{
        title : 'Viki Learn',
        id : 1,
        description: 'Language game developed to enourage learning of new languages through gamified elements. It included Levels, resources, building, story, quizzes, character creation and more. ',
        uploadDate : new Date("2021-04-08"),
        imgPath : '',
        techUsed: 'html, js',
        image: '/lab/vikiLearn.png',
        hostedLink: 'https://github.com/RasmusKW/PolyVikingGit',
        gitLink: 'https://github.com/RasmusKW/PolyVikingGit',
        files : [ { filename : 'main.js', content: "console.log('hello world')" }, { filename : 'notMain.js', content: "<script> alert(1) </script> \n<script> alert(1) </script><script> alert(1) </script><script> alert(1)\n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) \n </script><script> alert(1)\n</script><script> alert(1) </script><script> alert(1)\n </script><script> alert(1)\n </script>" } ]
    }];




router.get("/api/solution/get/:id", ( request , response ) => {
    const solution = solutions.find( solution => solution.id == request.params.id  );
    response.send( solution );
});

module.exports = {
    router
};