$( document ).ready( () => {
  createSolutions();
});


async function createSolutions() {
  try {

    const url = '/api/solution/orderBy?';
    params = { value : 'title', limit : 3 };
    const response = await fetch( url + new  URLSearchParams( params )  );
    const result = await response.json();
    createHTML( result )

  } catch ( error ) {
      console.log( error );
  }
}

function createHTML( data ) {

  for ( let index = 0; index < data.length; index++ ) {
    const element = data[index];
    
    const item = `
      <div class="col-md-4" href= "/solution/${element._id}">
        <div class="card text-white bg-dark mb-3" style="width: auto;">
          <a href="/solution/${element._id}"> <img  src="${element.image}" class="card-img-top"> </a>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text" style="font-weight: bold;">Description</p>
            <p class="card-text">${element.description}</p>
            <p class="card-text" style="font-weight: bold;">Solution By</p>
            <p class="card-text">${element.name} </p>
            <p class="card-text" style="font-weight: bold;">Tech Used</p>
            <p class="card-text">${element.tech} </p>
            <a href="/solution/${element._id}" class="btn btn-primary mb-3">See Solution</a>
          </div>
        </div>
      </div>
    `;

    $( '#carousel-item-displayer' ).append( $( item ) ); 
  }
}
