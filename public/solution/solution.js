$( document ).ready( getSolution() );
async function getSolution() {
  try {

      const response = await fetch("/api/solution/get/1");
      console.log( response );
      const result = await response.json();
      console.log( result )

      const mainContainer = $( '#mainContainer' );
      createSolution( result );
  } catch ( error ) {
      console.log( error );
  }
}


function createSolution( data ) {
  const solutionContainer = document.createElement( 'div' );
  solutionContainer.className = 'container' ;
  


  /** todo :
   * title, desciption, tech,
   * display filetree, display content.
   * display comments.
   */


   $( '#title').text( data.title );
   $( '#description').text( data.description );

  data.files.forEach( file => {
    const fileElement =  document.createElement( 'li' );
    fileElement.innerText = file.filename ;
    fileElement.dataset.fileName = file.filename ;
    $( '#fileList' ).append( fileElement );
    
  });

  $( '#fileContentDisplayer').text( data.files[0].content );

  
  
  $( '#mainContainer' ).append( solutionContainer );
}