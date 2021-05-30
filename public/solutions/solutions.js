


$(document).ready( () => {
    getElements();
  });
  
  
async function getElements() {
  try {

    const url = '/api/solutions/getSolutionsByProblem?';
    params = { id : $( '#problem-id' ).data( 'problem-id' ) };
    
    console.log(url + new  URLSearchParams( params ) );

    const response = await fetch( url + new  URLSearchParams( params )  );    
    console.log(response)
    const result = await response.json();

    console.log(result)

    await new Promise( (resolve, reject) =>{
      resolve( createHTML( result ) );
    }, ( error ) => { reject( error ); } );

  } catch ( error ) {
      console.log( error );
  }
}

function createHTML( data ) {

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    
    const item = `
    <div class="col-md-4">
        <div class="card text-white bg-dark mb-3" style="width: auto;">
            <img src="${element.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">Solution by: ${element.author} </p>
                <a href="/solution/${element._id}" class="btn btn-primary">Go to Solution</a>
            </div>
        </div>
    </div>
    `;
    $( '#solution-displayer' ).append( $( item ) ); 
  }
}

