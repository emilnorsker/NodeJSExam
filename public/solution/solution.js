let solutionID;

$( document ).ready( loadPage() );

async function loadPage() {
  await getSolution();
 
  // replace with a fetch to see if token is valid?
  allowEdit();
  defineSocketBehavior();
}

function defineSocketBehavior() {
  socket.on( 'comment' + solutionID, (data) => {
    addComment(data);
  });
}

async function getSolution() {
  try {
      solutionID = $( '#solutionID' ).data('solution');
      const response = await fetch("/api/solution/get/"+solutionID);
      const result = await response.json();

      const mainContainer = $( '#mainContainer' );
      await new Promise( (resolve, reject) =>{
        resolve( createSolution( result ) );
      }, ( error ) => { console.log( error ); } );

  } catch ( error ) {
      console.log( error );
  }
}

function createSolution( data ) {
  $( '#title').text( data.title );
  $( '#description').text( data.description );
  data.comments.forEach( comment => {
    console.log(comment);
    addComment(comment);
  });
  data.files.forEach( file => {

    const fileElement =  document.createElement( 'li' );
    fileElement.className = 'fileElement';
    fileElement.innerText = file.filename ;
    fileElement.dataset.fileName = file.filename ;
    fileElement.dataset.fileContent = file.content ;
    fileElement.onclick = () => {
      $( '#fileContentDisplayer').text( file.content );
      console.log('name ', file.filename)
      if(file.filename.includes('.html') || file.filename.includes('.css') ){
        // to do, create formatting, butonly on .html and css
      }
      highlight(); 
    }
    $( '#fileList' ).append( fileElement );  
  });

  $( '#fileContentDisplayer').text( data.files[0].content );
}

function sendComment() {
  const comment = $('#textarea').val();
  socket.emit("comment", { 'comment' : comment , 'solutionID' : solutionID} );
}

function addComment( data ) {
  let markup = 
    `<li>
    <div class="card border-light text-white bg-dark mb-3">
        <div class="card-body">
            <h6 class="text-">Martin Hansen</h6>
            <p style="text-align: left;">${data.comment}</p>
            <div>
                <img src="../assets/clock.png" alt="clock ">
                <small>${data.uploadTime}</small>
            </div>
        </div>
    </div>
    </li>`
    $( '#commentBox' ).append( markup );  
}


/** generates buttons and tools for editing a solution */
function allowEdit(){

  const saveBtn = document.createElement( 'button' );
  saveBtn.className = 'btn-primary';
  saveBtn.innerText = 'Save';
  saveBtn.style.float = 'right';
  
  saveBtn.onclick = () => { updateSolution() };

  const fileUpload = document.createElement( 'input' );
  fileUpload.type = 'file';
  fileUpload.id = 'fileUploadBtn';
  fileUpload.multiple = true;
  //fileUpload.addEventListener( 'change', () => { console.log($( '#fileUploadBtn' ).prop('files') ) } );

  const addFileBtn = document.createElement( 'button' );
  addFileBtn.className = 'btn-primary';
  addFileBtn.innerText = 'Add File';
  addFileBtn.onclick = () => {uploadFileTobrowser();}

  $( '#title' ).append( saveBtn );
  $( '#main-card' ).append( fileUpload );
  $( '#main-card' ).append( addFileBtn );


  /** todo :
   * post to solution -> create button with post, that takes in the info: v/
   * comments should not be changed.
  */

}

/** sends a post to the server, which update the solution  */
function updateSolution() {
  let files = [];
  if( $( '#fileList' ) ) {
    
    $( '#fileList' ).children('li').each( function() {
      console.log( $(this)[0] );
      const file = { filename : $(this)[0].dataset.fileName, content : $(this)[0].dataset.content }
      files.push(file);
      } );  

    }

    const solutionObject = {
      title : $('#title').text(),
      description : $('#description').text(),
      lastEditDate :  Date.now(),
      image : '',
      files : files
    }

  $.ajax( {
    url : `/api/solution/${ solutionID }/update`,
    method: 'post',
    contentType: 'application/json',
    data : JSON.stringify( { author : 'anon-007', solution : solutionObject } ),
  } ).done( (data) => {
    console.log( 'successfully sent, recieved : ', data );
  } );  
}
/** reads a document uploaded to the browser */
function uploadFileTobrowser() {
  const files = $( '#fileUploadBtn' ).prop('files');
  if(files.length == 0) return;
  Array.from(files).forEach( file => {
  
    const reader = new FileReader();
    let content;
    /** reads each line of the file and joins them */
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        content = lines.join('\n');
    };
    reader.onerror = ( error ) => alert( error.target.error.name );
 
    reader.readAsText( file ); 

    console.log( file );
    /** Adds the file to the viewer */
    const fileElement =  document.createElement( 'li' );
    fileElement.className = 'fileElement';
    fileElement.innerText = file.name ;
    fileElement.dataset.fileName = file.name ;
    fileElement.dataset.fileContent = file.content ;

    fileElement.onclick = () => {
      $( '#fileContentDisplayer').text( content );
      highlight(); 
    }
    $( '#fileList' ).append( fileElement );  

  } );
}

/** generates class name, that a .css will highligt in different colors  */
function highlight() {
document.querySelectorAll('.codeBox').forEach(block => {
  hljs.highlightBlock(block);
});
hljs.highlightAll();
}

//With help from https://stackoverflow.com/questions/22076190/highlightjs-with-html-code
//Script that escapes HTML inside <code> tags so that it is intepreted as text and thereby highlighted correctly by Highlight.js
function formatHtml() {
  $( '#fileContentDisplayer').forEach(function(element) {
  element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
});
}


