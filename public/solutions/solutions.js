


$( document ).ready( () => {
    getElements();
    createProblemTitle()
});

async function getElements() {
  try {

    const url = '/api/solutions/getSolutionsByProblem?';
    params = { id : $( '#problem-id' ).data( 'problem-id' ) };
    const response = await fetch( url + new  URLSearchParams( params )  );   
    const result = await response.json();
    createHTML( result );

  } catch ( error ) {
      console.log( error );
  }
}


function uploadSolution() {
  
  const solution = {
    comments : [],
    files : [],
    problem : $( '#problem-id' ).data( "problem-id" ),
    name : $( '#name' ).val(),
    title : $( '#title' ).val(),
    description : $( '#description' ).val(),
    image : $( '#image').val(), /*Array.from( $( '#image' ).prop( 'files' ) )[0]*/
    tech : $( '#tech' ).val(),
    git : $( '#git' ).val()
  }  
  
  $.ajax({
    url: '/upload/solution/',
    method: 'post',
    contentType: 'application/json',
    data : JSON.stringify( {
      solution: solution
    }),
    success: ( data ) => {
      location.replace( data ); 
    },
    error: ( data ) => {
      alert( data );
    } 
  });

}

function createHTML( data ) {
  for ( let index = 0; index < data.length; index++ ) {
    const element = data[index];
    
    const item = `
    <div class="col-md-4">
        <div class="card text-white bg-dark mb-5">
            <img src="${element.image}" class="card-img-top my-img">
            <div class="card-body">
                <h5 class="card-title" style="font-weight: bold;">${element.title}</h5>
                <p class="card-text" style="font-weight: bold;">Description</p>
                <p class="card-text">${element.description}</p>
                <p class="card-text" style="font-weight: bold;">Solution By</p>
                <p class="card-text">${element.name} </p>
                <a href="/solution/${element._id}" class="btn btn-primary mb-3">Go to Solution</a>
            </div>
        </div>
    </div>
    `;
    $( '#solution-displayer' ).append( $( item ) ); 
  }
}

async function createProblemTitle(){
  const url = '/api/problem/get/' + $( '#problem-id' ).data( 'problem-id' );
  const response = await fetch( url );    
  const result = await response.json();
  $( '#problem-title' ).text( "Problem for: " + result.title );
  $( '#problem-description' ).text( result.description );

}
                

