'use strict';

//global variables

var allImages = [];
var randomNumberArray = [];
var lastNumberArray = [];
var surveyLength = 0;
var imageDisplay = document.getElementById('imageDisplay');

//object constructor

function ImageFinder(name, filePath, displayCount, voteCount){
  this.name = name;
  this.filePath = filePath;
  this.displayCount = 0;
  this.voteCount = 0;
  allImages.push(this);
}

// object instances

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


//random number generator to pick images from the array

function randomNumberGenerator (){
  //Create 3 random numbers
  var randomNumber = Math.floor(Math.random() * allImages.length);
  var randomNumber1 = Math.floor(Math.random() * allImages.length);
  var randomNumber2 = Math.floor(Math.random() * allImages.length);
  console.log(randomNumber);
  console.log(randomNumber1);
  console.log(randomNumber2);
  //make sure no two numbers are identical. If unique, push to array. Otherwise, loop again.
  if (randomNumber !== randomNumber1 && randomNumber !== randomNumber2
    && randomNumber1 !== randomNumber2){
    randomNumberArray = [];
    randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
  } else {
    randomNumberGenerator();
  };
};

//function to fill empty HTML <img> elements with image file paths picked through the random number generator
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

// Function to ensure that the next series of random numbers does not duplicate the previous series of random numbers

function reloadImages() {
  //Clearing array that will hold previous round of random numbers
  lastNumberArray = [];

  //Pushing last round of numbers into lastNumberArray
  lastNumberArray.push(randomNumberArray[0]);
  lastNumberArray.push(randomNumberArray[1]);
  lastNumberArray.push(randomNumberArray[2]);

  //Re-assigning the variables for each picture
  var randomNumber = Math.floor(Math.random() * allImages.length);
  var randomNumber1 = Math.floor(Math.random() * allImages.length);
  var randomNumber2 = Math.floor(Math.random() * allImages.length);

  //Use the indexOf method to determine whether there are any duplicates
  var comparison = lastNumberArray.indexOf(randomNumber);
  var comparison1 = lastNumberArray.indexOf(randomNumber1);
  var comparison2 = lastNumberArray.indexOf(randomNumber2);
  if (comparison === -1 && comparison1 === -1 && comparison2 === -1){
    randomNumberArray = [];
    randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
    console.log('This is random number array', randomNumberArray);
    console.log('This is last number array', lastNumberArray);
  } else {
    reloadImages();
  };
};

//EVENT HANDLER
function handleNewRound(event){
  event.preventDefault();

  var clickedObject = event.target;
  console.log(clickedObject);
  console.log(event.target.id);

//Conditional to tally a vote for the clicked images, and alert user if they don't click on an image. Then, clear the images, run the random number generator, and display 3 new images

  if (event.target.id === 'left') {
    allImages[randomNumberArray[0]].voteCount += 1;
    surveyLength += 1;
  } else if (event.target.id === 'center') {
    allImages[randomNumberArray[1]].voteCount += 1;
    surveyLength += 1;
  } else if (event.target.id === 'right'){
    allImages[randomNumberArray[2]].voteCount += 1;
    surveyLength += 1;
  } else {
    alert('Pick an image, dummy!');
  };
  reloadImages();
  displayImages();

//Limiting Survey to 25 rounds
  if (surveyLength === 3) {
    imageDisplay.removeEventListener('click', handleNewRound);
  }
};


//RUN THE FUNCTIONS TO FILL THE TABLE ON LOAD

displayImages();



//EVENT LISTENER

imageDisplay.addEventListener('click', handleNewRound);
