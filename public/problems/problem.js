


$(document).ready( () => {
    createSolutions();
  });
  
  
async function createSolutions() {
  try {

    const url = '/api/problems/orderBy?';
    params = { value : 'title' };
    
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
    <div class="col">
        <div class="card text-white bg-dark mx-auto">
            <div class="row no-gutters">
                <div class="col-sm-4 img" style="background: #868e96;">
                    <img src="/assets/vikiLearn.png" class="my-img h-100">
                </div>
                <div class="col-sm-5">
                    <div class="card-body">
                        <h5 class="card-title">Viki Learn</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                            lacinia elit lorem</p>
                        <a href="/solutions" class="btn btn-primary">Go to Solutions</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $( '#problems-displayer' ).append( $( item ) ); 
  }
}

