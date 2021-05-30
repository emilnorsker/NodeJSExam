
$(document).ready( () => {
  createSolutions();
});


async function createSolutions() {
  try {

    const url = '/api/solution/orderBy?';
    params = { value : 'title', limit : 3 };
    
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
      <div class="col-md-4" href= "/solution/${element._id}">
        <div class="card text-white bg-dark mb-3" style="width: auto;">
          <a href="/solution/${element._id}"> <img  src="${element.image}" class="card-img-top"> </a>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-tex">${element.description}</p>
            <p class="card-text">${element.techUsed} </p>
            <a href="/solution/${element._id}" class="btn btn-primary">See Solution</a>
          </div>
        </div>
      </div>
    `;

    $( '#carousel-item-displayer' ).append( $( item ) ); 
  }
  console.log($('.carousel .carousel-item'))  
}



/** not working, do not use  */
function createCarousel() {
  $('.carousel .carousel-item').each( function() {
    const currentCarouselItem = $(this);
    const minPerSlide = 3;

    console.log( 'item : ', $(this))  
    /** iterate through items, to find the last element  */
      let next = currentCarouselItem.next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo( currentCarouselItem );
     
      
      for (let i = 0; i < minPerSlide; i++) {
          next=next.next();
          if (!next.length) {
            next = currentCarouselItem.siblings(':first');
          }
          
          next.children(':first-child').clone().appendTo( currentCarouselItem );
        }
  });
}

