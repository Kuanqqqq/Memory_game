// VARIABLE DECLARATIONS
let card = document.getElementsByClassName("card");
let cards = [...card];
var unique_cards = 8;
var initialScore = 1000;

let images =["img/Arctic_Fox.png", "img/Black_Bear.png", "img/Canada_Goose.png", "img/Canada_Lynx.png", "img/Greater_Short-Horned_Lizard.png", "img/Habour_Seal.png", "img/Mink.png", "img/Painted_Turtle.png",]
let images2 = ["imgs/001.jpg","imgs/002.jpg","imgs/003.jpg","imgs/004.jpg","imgs/005.jpg","imgs/006.jpg","imgs/007.jpg","imgs/008.jpg"]
var ids = ['001', '002', '003', '004', '005', '006', '007', '008', 
           '009', '010', '011', '012', '013', '014', '015', '016'];
const list = document.getElementById("card-list");

let inform =[
  "<h3>Arctic Fox</h3>" +
  "<br>Found in the northern stretches of Canada, this fox eats fish, rodents and carrion. Active all winter, they have kits in April and May, utilizing amazing instincts to keep warm during the winter, like building dens pointed towards the sun.</br>"+
  "<br>Arctic Foxes are built to survive a temperature range of 100 degrees celsius, 30 to -70 degrees!</br>", 

  "<h3>Black Bear</h3>"+
  "<br>One of the most famous arboreal carnivores, the black bear actually does its best to avoid human contact or conflict. Able to swim, climb trees or navigate the urban landscape, the black bear is the swiss army knife of bears.</br>"+
  "<br>The black bear can breed with several other bear types!</br>",

  "<h3>Canada Goose</h3>"+
  "<br>Found throughout all of Canada, geese are known to establish nesting areas in urban areas, using humans to protect themselves against predators and granting easy access to food. The preception of geese being migratory may be changing soon, as more of these birds decide to stay put even through winter.</br>"+
  "<br>These birds are populous, with more then 4 million of them in North America!</br>", 

  "<h3>Canadian Lynx</h3>"+
  "<br>Noctural and carnivorous, this feline tends to hunt the hares that comprise from 35-90% of their diet. A solitary creature, each lynx has a territory of over 100 square miles.</br>"+
  "<br>Unlike most cats, this one loves water and can swim over two miles in one go!</br>", 

  "<h3>Greater Short-Horned Lizard</h3>"+
  "<br>Feeding mostly on ants and other bugs, they rely on camoflague to avoid predators. By using its unique defense mechanism to fend off predators, these unqiue lizards actually give birth to live young, rather then eggs.</br>"+
  "<br>The Short Horned Lizard can shoot blood from its eyeballs!</br>", 

  "<h3>Habour Seal</h3>"+
  "<br>Solitary unless it is during breeding season, these sea treading mammals are not just found in Caada, but all around the worlds coasts. Surviving off a diet of fish, sea food and other ocean born creatures, the seal has been known to eat ducks as well.</br>"+
  "<br>The seal can live to over 30 years old!</br>", 

  "<h3>Mink</h3>"+
  "<br>A distant relative of the otter and weasel, the carnivorous mink is one of the most important fur trade animals. Spread throughout almost all of Canada, the Mink has been shown to be smarter then even house cats.</br>"+
  "<br>Minks have been hunted for their fur since the 1500's!</br>", 

  "<h3>Painted Turtle</h3>"+
  "<br>One of the few natural turtles of Canada, the painted turtles ability to live in urban areas contrbutes heavily to its most numerous turtle in Canada status. Hibernating during winter, the turtle feeds on both animals and plants.</br>"+
  "<br>These reptiles can live long enough to qualify for senior discounts! Over 60 years!</br>",
]

//get a reference to the element
var myBtn = document.getElementById('startRestart');

// //const deck = document.getElementById("list");
var openedCards = [];
var matchedTypes = [];

var win = false;

var moves = 0; //for moves counter

// the following is for the timer
var minutesLabel = document.getElementById('min');
var secondsLabel = document.getElementById('sec');
var totalSeconds = 0;

var music_audio = new Audio('sounds/test.mp3');
var match_audio = new Audio('sounds/ding_v2.mp3');

// CLASSES
class cardObj {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  isMatch(other) {
    return other.type == this.type;
  }
}



// FUNCTIONS

// Plays the currently loaded music in the variable music_audio.
function playMusic() {
  music_audio.play();
}

// Stops the currently loaded music in the variable music_audio.
function stopMusic() {
  music_audio.play();
}

function hasWon() {
  return win;
}

function returnScore() {
  return initialScore;
}

// The following function calculate scores.
// Score function = 1000 - totalSeconds - (moves*10).
function reCalculateScore(move = false, time = false) {
  if (move) {
    initialScore -= 10;
  } else if (time) {
    if (totalSeconds < 11) return;
    initialScore -= 1;
  }
  document.getElementById("score").innerHTML = initialScore;
}

function resetButtonInit() {

  //add event listener

  myBtn.addEventListener('click', function(event) {

   console.log("Reset game!");

   var elems = document.getElementsByTagName("li"); //checks every element

   for (var i = 0; i < elems.length; i++) {

     var elem = elems[i]; //checks every element

     if (matchedTypes.includes(elem.type)) { // flip downside all cards that have been matched

       elem.classList.toggle("open");

       elem.classList.toggle("show");

       elem.classList.toggle("disabled");

     }

   }

   // if openedCards is not empty, there will only be one card within

   if (openedCards.length != 0) {

     var elem = document.getElementById(openedCards[0].id); // get element attached to card

     // flip it downside

     elem.classList.toggle("open");

     elem.classList.toggle("show");

     elem.classList.toggle("disabled");

     // clear the array

     openedCards = [];

   }

   moves = 0;
   document.getElementById("move_count").innerHTML = 0;

   timer.clearInterval();

   totalSeconds = 0;
   secondsLabel.innerHTML = 0;
   minutesLabel.innerHTML = 0;

   timer = setInterval(timeTracker, 1000); 

   matchedTypes = []; // cleared matched array

   shuffleCards(); // reshuffle cards

 });

}



/*
var displayCard = function () {
  console.log("card selected!");

  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}; */

// If the amount of matched types is equal to unique cards, all cards are matched and the user has won.
function checkWin() {
  if (matchedTypes.length == unique_cards) {
    clearInterval(timer);
    win = true;
    alert("Congratulations, you have won!\nTime: " + toTimeString(parseInt(totalSeconds/60), true) + ":" + toTimeString(totalSeconds % 60, false)
          + "\nMoves: " + document.getElementById("move_count").innerHTML);
  }
}

/* Pretty sure this does not work because elem.type is an HTML element and j is not.
 * I do not know how to convert them however.
 * This is a more brute force solution I tried after multiple failed attempts, feel
 * free to make a better solution. 
 * It is possible to parse through inner HTML elements, so this may be our solution.
 * */

 /*
function setProperImages() {
  for (var i = 0; i < (unique_cards*2); i++) {
    for (var j = 0; j < 8; j++) {
      var elem = document.getElementById(ids[i]);
      if (elem.type == j) {
        elem.style.backgroundImage = "url('imgs/" + j + ".jpg')";
      }
    }
  }
}
*/

/* Helper function for our time tracking function, returns string in proper time format MM:SS */
function toTimeString(int, min) {
  var timeString = int + ""; // converts the int into a string

  // We don't want the extra 0 showing for minutes, so we check if we are using this function for seconds or minutes
  if (timeString.length < 2 && min == false) { // if seconds < 10, then we will have 0 before: 00, 01, 02.
    return "0" + timeString;
  } else { // otherwise, just return string as is.
    return timeString;
  }
}

/* Keeps track of time. Is called every seconds by setInterval called in the startGame function. */
function timeTracker() {
  ++totalSeconds;
  reCalculateScore(move = false, time = true);
  secondsLabel.innerHTML = toTimeString(totalSeconds % 60, false);
  minutesLabel.innerHTML = toTimeString(parseInt(totalSeconds/60), true);
}

/* Fisher-Yates shuffle algorithm.
 * Code from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

/* Shuffle where the cards are in the HTML code so that
 * the cards are in a randomized order. */
function shuffleCards() {
  var possibleTypes = [];
  var possibleIds = ids;
  var count = 0;

  /* Fill with all possible types; used for loop for possible
   * dynamic amount of cards later */
  for (var i = 0; i < 8; i ++) {
    for (var j = 0; j < 2; j++) {
      possibleTypes[count] = i;
      count ++;
    }
  }

  var elem;

  shuffle(possibleTypes); // shuffles our array so the .pop() will return random type

  // Each HTML element will now get a random type
  while(possibleIds.length != 0) {
    elem = document.getElementById(possibleIds.pop());

    elem.type = possibleTypes.pop();
    
    // added this but it is currently in the wrong spot for this shuffle function
    document.getElementById(elem.id).getElementsByTagName('img')[0].src = images2[elem.type];
  }
}

/* A card's id and type are put through this function and if it
 * is the only card open, it will simply be added to the 
 * openedCards array. If there are two cards open, then they
 * it will be checked if they match; if they do, they are added
 * to the matchedTypes array and they stay open, otherwise they
 * are closed. Either way, openedCards array is reset. */
function checkMatch(card_type, card_id) {
  if (matchedTypes.includes(card_type)) // matched cards stay flipped
    return;

  if (openedCards.length == 2) {
    setTimeout(checkMatch(card_type, card_id), 700);
    return;
  }

  flipById(card_id); // flip the card

  openedCards.push(new cardObj(card_type, card_id));
  if (openedCards.length == 2) { // two cards flipped
    card1 = openedCards[0]; // get first card
    card2 = openedCards[1]; // get second card

     /* We use the setTimeout function to delay the code by 0.7s, the same time of the current
      * placeholder animation. Other cards cannot be pressed in this instance however, and
      * feels a little sloppy. I have a less choppy implementation of checking the 
      * openedCards array every pressed card, with a given max amount of opened cards,
      * just so the user can click on other cards during the animation. For now I will
      * leave it be. */
    setTimeout(function() {
      // increment moves counter
      document.getElementById("move_count").innerHTML = (++moves).toString();
      reCalculateScore(move = true, time = false);

      if (card1.isMatch(card2)) {
        matchedTypes.push(card_type); // cards will now stay flipped
        match_audio.play();
        // document.getElementById("infoSquare").innerHTML = inform[card_type];
        checkWin();
      } else { // otherwise, reflip cards
        flipById(card1.id); 
        flipById(card2.id);
      }

      /* Remove elements from the openedCards array. We do this after so that
       * the length of openedCards remains 2 so other cards will no be pressed. */
      openedCards.pop();
      openedCards.pop();

    }, 700);
  }
}

/* Function that grabs an element by its id and then flips it over.
 * Will be adding functionality to search for specific jpegs when I have
 * time/or someone who is reading this can do it. */
function flipById(card_id) {
  var element = document.getElementById(card_id);
  element.classList.toggle("open");
  element.classList.toggle("show");
  element.classList.toggle("disabled");
}

// MAIN FUNCTION

function startGame() {
  // general setup
  shuffleCards();
  //setProperImages();
  //resetButtonInit(); // reset button needs to be figured out.
  //playMusic(); // start the game's music. Couldn't stand it anymore so I turned it off.
  document.addEventListener('contextmenu', event => event.preventDefault()); //disables right click

  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    // card.show.backgroundImage = "url('2.jpg')"; 
    // card.addEventListener("click", displayCard);  
    card.addEventListener("click", function() {
      checkMatch(this.type, this.id);
    });  
  }
}

// GLOBAL CODE
startGame(); //start game

/* Set timer to a variable so we can stop and reset it.
 * Needs to be set globally so the checkWin function can access it. */
var timer = setInterval(timeTracker, 1000); 
