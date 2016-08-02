'use strict';

//GLOBAL VARIABLES

var allImages = [];
var randomNumberArray = [];
var lastNumberArray = [];
var surveyLength = 0;
var imageDisplay = document.getElementById('imageDisplay');

//OBJECT CONSTRUCTOR
function ImageFinder(name, filePath, displayCount, voteCount){
  this.name = name;
  this.filePath = filePath;
  this.displayCount = 0;
  this.voteCount = 0;
  allImages.push(this);
}

// OBJECT INSTANCES CREATING OBJECTS FOR EACH IMAGE FILE
var bag = new ImageFinder('Bag', 'img/bag.jpg');
var banana = new ImageFinder('Banana', 'img/banana.jpg');
var bathroom = new ImageFinder('Bathroom', 'img/bathroom.jpg');
var boots = new ImageFinder('Boots', 'img/boots.jpg');
var breakfast = new ImageFinder('Breakfast', 'img/breakfast.jpg');
var bubblegum = new ImageFinder('Bubblegum', 'img/bubblegum.jpg');
var chair = new ImageFinder('Chair', 'img/chair.jpg');
var cthulhu = new ImageFinder('Cthulhu', 'img/cthulhu.jpg');
var dogDuck = new ImageFinder('Dog Duck', 'img/dog-duck.jpg');
var dragon = new ImageFinder('Dragon', 'img/dragon.jpg');
var pen = new ImageFinder('Pen', 'img/pen.jpg');
var petSweep = new ImageFinder('Pet Sweep', 'img/pet-sweep.jpg');
var scissors = new ImageFinder('Scissors', 'img/scissors.jpg');
var sweep = new ImageFinder('Sweep', 'img/sweep.jpg');
var shark = new ImageFinder('Shark', 'img/shark.jpg');
var tauntaun = new ImageFinder('Tauntaun', 'img/tauntaun.jpg');
var unicorn = new ImageFinder('Unicorn', 'img/unicorn.jpg');
var usb = new ImageFinder('USB', 'img/usb.gif');
var waterCan = new ImageFinder('Water Can', 'img/water-can.jpg');
var wineGlass = new ImageFinder('Wine Glass', 'img/wine-glass.jpg');


//RANDOM NUMBER GENERATOR

function randomNumberGenerator (){
  //CREATING 3 RANDOM NUMBERS
  var randomNumber = Math.floor(Math.random() * allImages.length);
  var randomNumber1 = Math.floor(Math.random() * allImages.length);
  var randomNumber2 = Math.floor(Math.random() * allImages.length);
  console.log(randomNumber);
  console.log(randomNumber1);
  console.log(randomNumber2);
  //MAKING SURE NO TWO NUMBERS ARE IDENTICAL. IF IDENTICAL, LOOP AGAIN. OTHERWISE, PUSH TO ARRAY
  if (randomNumber !== randomNumber1 && randomNumber !== randomNumber2
    && randomNumber1 !== randomNumber2){
    randomNumberArray = [];
    randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
    // console.log('Three unique numbers');
  } else {
    randomNumberGenerator();
    // console.log('Duplicate Found');
  };
};

//FUNCTION TO FILL EMPTY <img> HTML ELEMENTS WITH RANDOMLY GENERATED IMAGES FROM THE IMAGE ARRAY
function displayImages(){
  randomNumberGenerator();
  var leftImage = document.getElementById('left');
  leftImage.src = allImages[randomNumberArray[0]].filePath;
  // console.log('this is', allImages[randomNumberArray[0]].filePath);
  allImages[randomNumberArray[0]].displayCount += 1;
  var centerImage = document.getElementById('center');
  centerImage.src = allImages[randomNumberArray[1]].filePath;
  allImages[randomNumberArray[1]].displayCount += 1;
  var rightImage = document.getElementById('right');
  rightImage.src = allImages[randomNumberArray[2]].filePath;
  allImages[randomNumberArray[2]].displayCount += 1;
};

//RUN THE FUNCTIONS TO FILL THE TABLE ON LOAD
randomNumberGenerator();
displayImages();


//EVENT HANDLER
function handleNewRound(event){
  event.preventDefault();

  randomNumberGenerator();
  displayImages();

  var clickedObject = event.target;
  console.log(clickedObject);
  console.log(event.target.id);

//Conditional to tally a vote for the clicked images, and alert user if they don't click on an image. Then, clear the images, run the random number generator, and display 3 new images

  if (event.target.id === 'left') {
    allImages[randomNumberArray[0]].voteCount += 1;
    console.log(allImages[randomNumberArray[0]].name + ' has ' + allImages[randomNumberArray[0]].voteCount + ' votes ');
  } else if (event.target.id === 'center') {
    allImages[randomNumberArray[1]].voteCount += 1;
    console.log(allImages[randomNumberArray[1]].name + ' has ' + allImages[randomNumberArray[1]].voteCount + ' votes ');
  } else if (event.target.id === 'right'){
    allImages[randomNumberArray[2]].voteCount += 1;
    console.log(allImages[randomNumberArray[2]].name + ' has  ' + allImages[randomNumberArray[2]].voteCount + ' votes ');
  } else {
    alert('Pick an image, dummy!');
  };
};



//EVENT LISTENER

imageDisplay.addEventListener('click', handleNewRound);
