


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

function uploadProblem() {
  const problem = {
    problem : $( '#problem-id' ).data( "problem-id" ),
    name : $( '#name' ).val(),
    title : $( '#title' ).val(),
    description : $( '#description' ).val(),
    image : $( '#image').val(), /*Array.from( $( '#image' ).prop( 'files' ) )[0]*/
    tech : $( '#tech' ).val()
  }  
  
  $.ajax({
    url: '/upload/problem/',
    method: 'post',
    contentType: 'application/json',
    data : JSON.stringify( {
      problem: problem
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

  for (let index = 0; index < data.length; index++) {
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
                <p class="card-text" style="font-weight: bold;">Tech Used</p>
                <p class="card-text">${element.tech} </p>
                <a href="/solutions/${element._id}" class="btn btn-primary mb-3">See Solutions</a>
            </div>
        </div>
    </div>
    `;
    $( '#problems-displayer' ).append( $( item ) ); 
  }
}

function search() {
  var input, filter, card, cardTitle, i, h5, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  card = document.getElementById('card')
  cardTitle = card.getElementsByClassName('card-title');

  for (i = 0; i < h5.length; i++){
    h5 = cardTitle[i].getElementsByTagName('h5')[0];
    txtValue = h5.textContent || h5.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cardTitle[i].style.display = "";
    } else {
      cardTitle[i].style.display = "none";
    }
  }
  
}
