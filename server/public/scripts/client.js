$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  $('#submitButton').on('click',addBets);
}
let playerNumber = 1;



function addBets() {
    console.log('inside addBets');

  let roundOfBets = {
        bet1: $('#playeroneInput').val(),
        bet2: $('#playertwoInput').val(),
        bet3: $('#playerthreeInput').val()
    };
    console.log('roundOfBets is', roundOfBets);
    $.ajax({
        method: 'POST',
        url: '/addBets',
        data: roundOfBets,
    }).then((response) => {
        console.log('POST /addBets', response);

      getResults();
        
    }).catch(error => {
        console.log('POST / server failed', error);
        $('body').append(`
        <h2> 
            Failed to save bets! Check your inputs!
        </h2>
        `);
    });
    $('#playeroneInput').val(''),
    $('#playertwoInput').val(''),
    $('#playerthreeInput').val('')

}

function getResults() {
  $.ajax({
      method: 'GET',
      url: '/betResults',
  })
      .then((response) => {
          console.log('GET /betResults response', response)
        let resultsList =  $('#results');
        console.log('results list element', resultsList);

        resultsList.empty();
        for (let result of response) {
          console.log(result);
            resultsList.append(`
              <h1> Player ${playerNumber}'s number ${result} </h1>
            `);
            playerNumber++;
        }
      }
)

playerNumber = 1;


};


