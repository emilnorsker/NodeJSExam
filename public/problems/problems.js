


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
                    <img src="${element.img}" alt="<a href="/" style="color: white;"  class="text-decoration-none">Solution Hub</a>" class="my-img h-100">
                </div>
                <div class="col-sm-5">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.description}</p>
                        <a href="/solutions/${element._id}" class="btn btn-primary">Go to Solutions</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $( '#problems-displayer' ).append( $( item ) ); 
  }
}

