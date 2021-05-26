

$( document ).ready( loadPage() );

let solutionID;

async function loadPage() {

  await getSolution();
  formatHtml();
  highlight();

  solutionID = $( '#solutionID' ).data('solution');

  socket.on( 'comment' + solutionID, (data) => {
    console.log( 'recieved comment : ', data.comment)
    $( '#commentsField' ).append( data ); 
  });
}

function sendComment() {
  console.log( 'sending comment' );
  const comment = $('#commentTextArea').val();
  console.log(comment);
  
  socket.emit("comment", { 'comment' : comment , 'solutionID' : solutionID} );
}

async function getSolution() {
  try {

      const response = await fetch("/api/solution/get/1");
      console.log( response );
      const result = await response.json();
      console.log( result )

      const mainContainer = $( '#mainContainer' );
      await new Promise( (resolve, reject) =>{
        createSolution( result );
        resolve();
      }, ( error ) => { console.log( error ); } );

  } catch ( error ) {
      console.log( error );
  }
}

function createSolution( data ) {
  
  $( '#title').text( data.title );
  $( '#description').text( data.description );
  data.files.forEach( file => {
    
    const fileElement =  document.createElement( 'li' );
    fileElement.innerText = file.filename ;
    fileElement.dataset.fileName = file.filename ;
    fileElement.onclick = () => {
      $( '#fileContentDisplayer').text( file.content );
      highlight(); 
    }
    $( '#fileList' ).append( fileElement );  
  });

  $( '#fileContentDisplayer').text( data.files[0].content );
}





function highlight() {
document.querySelectorAll('.codeBox').forEach(block => {
  // then highlight each
  hljs.highlightBlock(block);
});
}


//With help from https://stackoverflow.com/questions/22076190/highlightjs-with-html-code

//Script that escapes HTML inside <code> tags so that it is intepreted as text and thereby highlighted correctly by Highlight.js
function formatHtml() {
document.querySelectorAll('.codeBox').forEach(function(element) {
  element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
});
}


