let solutionID;

$( document ).ready( loadPage() );

async function loadPage() {
  solutionID = $( '#solutionID' ).data('solution');
  await getSolution();
  formatHtml();
  highlight();

  // replace with a fetch to see if token is valid?
  allowEdit();
  defineOnIO();
}

function defineOnIO() {
  socket.on( 'comment' + solutionID, (data) => {
    addComment(data);
  });
}

function addComment( data ) {
  let markup = 
    `<li>
    <div class="card border-light text-white bg-dark mb-3">
        <div class="card-body">
            <h6 class="text-">Martin Hansen</h6>
            <p style="text-align: left;">${data.comment}</p>
            <div>
                <img src="/solution/clock.png" alt="clock">
                <small>${data.uploadTime}</small>
            </div>
        </div>
    </div>
    </li>`
    console.log( 'recieved comment : ', data.comment)
    $( '#commentBox' ).append( markup );  
}

function sendComment() {
  //console.log( 'sending comment' );
  const comment = $('#textarea').val();
  //console.log(comment);
  
  socket.emit("comment", { 'comment' : comment , 'solutionID' : solutionID} );
}

async function getSolution() {
  try {

      const response = await fetch("/api/solution/get/1");
      //console.log( response );
      const result = await response.json();
      //console.log( result )

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
  /*data.comments.forEach( comment => {
    console.log(comment);
    addComment(comment);
  });*/
  data.files.forEach( file => {
    
    const fileElement =  document.createElement( 'li' );
    fileElement.className = 'fileElement';
    fileElement.innerText = file.filename ;
    fileElement.dataset.fileName = file.filename ;
    fileElement.dataset.fileContent = file.content ;
    fileElement.onclick = () => {
      $( '#fileContentDisplayer').text( file.content );
      highlight(); 
    }
    $( '#fileList' ).append( fileElement );  
  });

  $( '#fileContentDisplayer').text( data.files[0].content );
}

function allowEdit(){

  const saveBtn = document.createElement( 'button' );
  saveBtn.className = 'btn-primary';
  saveBtn.innerText = 'Save';
  saveBtn.style.float = 'right';

  

  /** read content */

  let files = [];
  if( $('.fileElement') ) {
  $( '.fileElement' ).each( (_file) => {
    const file = { filename : _file.dataset.fileName, content : _file.dataset.content }
    files.push(file);
  } );
  }
  
  const solutionObject = {
    title : $('#title').val(),
    description : $('#description').val(),
    lastEditDate :  Date.now(),
    image : '',
    files : files
  }

  saveBtn.onclick = () => {};

  const fileUpload = document.createElement( 'input' );
  fileUpload.type = 'file';
  fileUpload.id = 'fileUploadBtn';
  fileUpload.multiple = true;
  fileUpload.onclick = () => {};

  const addFileBtn = document.createElement( 'button' );
  addFileBtn.className = 'btn-primary';
  addFileBtn.innerText = 'Add File';


  $( '#title' ).append( saveBtn );
  $( '#fileContentDisplayer' ).append( fileUpload );
  $( '#fileContentDisplayer' ).append( addFileBtn );

  /** todo :
   * upload file -> create button to upload file, read contents, display contents. v/
   * change text -> make text editable,  
   * post to solution -> create button with post, that takes in the info:
   * author name, all fields, #some token for security#, all files as a file name and a text.
   * **comments should not be changed.
  */
}

function uploadFileTobrowser() {
}


function highlight() {
document.querySelectorAll('.codeBox').forEach(block => {
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


