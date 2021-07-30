const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

//
let randomNum = getRandom(1,25);
// let randomNum = 15;
console.log(randomNum);

let betArray = [];
let resultArray = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
// app.get('/numberGenerated', function(req, res) {
  
// }
app.post('/addBets', (req, res) => {
  console.log('got new bets submitted')
  let playeroneBet = req.body.bet1;
  let playertwoBet = req.body.bet2;
  let playerthreeBet = req.body.bet3; 
  console.log(req.body);

  // clear out old data
  betArray = [];
  resultArray = [];
  betArray.push({p1Bet: playeroneBet, p2Bet: playertwoBet, p3Bet: playerthreeBet});

  console.log("bet array is", betArray);
  console.log("bet array at 0 dot p1bet", (betArray[0].p1Bet));
  iteratethruBets();
  res.sendStatus(201); // 
});

//send back 
// }
app.get('/betResults', (req, res) => {
  console.log('got bet results back')
  res.send(resultArray);
});



function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function iteratethruBets() {
  resultArray.push(compareBets(betArray[0].p1Bet));
  resultArray.push(compareBets(betArray[0].p2Bet));
  resultArray.push(compareBets(betArray[0].p3Bet));
  console.log("random num is:", randomNum );
  console.log(resultArray);
}

function compareBets(inputNum) {
  if (inputNum == randomNum) {
    randomNum = getRandom(1,25);
    return `${inputNum} is the correct answer`;
    console.log(`${inputNum} is the correct answer`);
  } 
  else if (inputNum > randomNum) {
    return `${inputNum} is higher`;
    console.log(`${inputNum} is higher`);
  } 
  else if (inputNum < randomNum) {
    return `${inputNum} is lower`;
    console.log(`${inputNum} is lower`);
  } 

}


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT);
});
