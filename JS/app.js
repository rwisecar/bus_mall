'use strict';

//global variables

var allImages = [];
var randomNumberArray = [];
var lastNumberArray = [100, 150, 250];
var names = [];
var votes = [];
var surveyLength = 0;
var imageDisplay = document.getElementById('imageDisplay');
var randomNumber = 0;
var randomNumber1 = 0;
var randomNumber2 = 0

//object constructor

function ImageFinder(name, filePath){
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

function displayImages (){
  //populate first array with three impossible numbers

  randomNumber = Math.floor(Math.random() * allImages.length);
  console.log(randomNumber);
  while (lastNumberArray.indexOf(randomNumber) !== -1){
    randomNumber = Math.floor(Math.random() * allImages.length);
  }

  randomNumber1 = Math.floor(Math.random() * allImages.length);
  console.log(randomNumber1);
  while ((randomNumber1 === randomNumber) || (lastNumberArray.indexOf(randomNumber1) !== -1)) {
    randomNumber1 = Math.floor(Math.random() * allImages.length);
  }

  randomNumber2 = Math.floor(Math.random() * allImages.length);
  console.log(randomNumber2);
  while ((randomNumber2 === randomNumber1) || (randomNumber2 === randomNumber) || (lastNumberArray.indexOf(randomNumber1) !== -1)) {
    randomNumber2 = Math.floor(Math.random() * (allImages.length));
  }

  randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
  console.log(randomNumber, randomNumber1, randomNumber2);

  var leftImage = document.getElementById('left');
  leftImage.src = allImages[randomNumberArray[0]].filePath;
  allImages[randomNumberArray[0]].displayCount += 1;
  var centerImage = document.getElementById('center');
  centerImage.src = allImages[randomNumberArray[1]].filePath;
  allImages[randomNumberArray[1]].displayCount += 1;
  var rightImage = document.getElementById('right');
  rightImage.src = allImages[randomNumberArray[2]].filePath;
  allImages[randomNumberArray[2]].displayCount += 1;

  lastNumberArray = [];
  lastNumberArray.push[randomNumber];
  lastNumberArray.push[randomNumber1];
  lastNumberArray.push[randomNumber2];

};

displayImages();

//
// //
// //EVENT HANDLER
function handleNewRound(event){
  event.preventDefault();

  var clickedObject = event.target;
  console.log(clickedObject);
  console.log(event.target.id);

  displayImages();

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

    randomNumberArray = [];

//Limiting Survey to 25 rounds
  if (surveyLength === 10) {
    imageDisplay.removeEventListener('click', handleNewRound);
  }


  function updateChartArrays() {
    for (var i = 0; i < allImages.length; i++) {
      votes[i] = allImages[i].voteCount;
      names[i] = allImages[i].name;
    };
  };
  updateChartArrays();
};

//Chart Drawing


//EVENT LISTENER

imageDisplay.addEventListener('click', handleNewRound);
