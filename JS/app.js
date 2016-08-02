'use strict';

//GLOBAL VARIABLES

var allImages = [];
var randomNumberArray = [];
var imageDisplay = document.getElementById('imageDisplay');

//OBJECT CONSTRUCTOR
function ImageFinder(name, filePath, displayTally, voteTally){
  this.name = name;
  this.filePath = filePath;
  this.displayCount = 0;
  this.voteCount = 0;
  allImages.push(this);
}

// OBJECT INSTANCES CREATING OBJECTS FOR EACH IMAGE FILE
var bag = new ImageFinder('Bag', 'img/bag.jpg', 0, 0);
var banana = new ImageFinder('Banana', 'img/banana.jpg', 0, 0);
var bathroom = new ImageFinder('Bathroom', 'img/bathroom.jpg', 0, 0);
var boots = new ImageFinder('Boots', 'img/boots.jpg', 0, 0);
var breakfast = new ImageFinder('Breakfast', 'img/breakfast.jpg', 0, 0);
var bubblegum = new ImageFinder('Bubblegum', 'img/bubblegum.jpg', 0, 0);
var chair = new ImageFinder('Chair', 'img/chair.jpg', 0, 0);
var cthulhu = new ImageFinder('Cthulhu', 'img/cthulhu.jpg', 0, 0);
var dogDuck = new ImageFinder('Dog Duck', 'img/dog-duck.jpg', 0, 0);
var dragon = new ImageFinder('Dragon', 'img/dragon.jpg', 0, 0);
var pen = new ImageFinder('Pen', 'img/pen.jpg', 0, 0);
var petSweep = new ImageFinder('Pet Sweep', 'img/pet-sweep.jpg', 0, 0);
var scissors = new ImageFinder('Scissors', 'img/scissors.jpg', 0, 0);
var sweep = new ImageFinder('Sweep', 'img/sweep.png', 0, 0);
var shark = new ImageFinder('Shark', 'img/shark.jpg', 0, 0);
var tauntaun = new ImageFinder('Tauntaun', 'img/tauntaun.jpg', 0, 0);
var unicorn = new ImageFinder('Unicorn', 'img/unicorn.jpg', 0, 0);
var usb = new ImageFinder('USB', 'img/usb.gif', 0, 0);
var waterCan = new ImageFinder('Water Can', 'img/water-can.jpg', 0, 0);
var wineGlass = new ImageFinder('Wine Glass', 'img/wine-glass.jpg', 0, 0);

//RANDOM NUMBER GENERATOR

function randomNumberGenerator (){
  //CREATING 3 RANDOM NUMBERS
  var randomNumber = Math.floor((Math.random() * allImages.length) + 1);
  var randomNumber1 = Math.floor((Math.random() * allImages.length) + 1);
  var randomNumber2 = Math.floor((Math.random() * allImages.length) + 1);
  console.log(randomNumber);
  console.log(randomNumber1);
  console.log(randomNumber2);
  //MAKING SURE NO TWO NUMBERS ARE IDENTICAL. IF IDENTICAL, LOOP AGAIN. OTHERWISE, PUSH TO ARRAY
  if (randomNumber !== randomNumber1 && randomNumber !== randomNumber2 && randomNumber1 !== randomNumber2){
    randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
    // console.log('Three unique numbers');
  } else {
    randomNumberGenerator();
    // console.log('Duplicate Found');
  };
};
randomNumberGenerator();


//FUNCTION TO FILL EMPTY <img> HTML ELEMENTS WITH RANDOMLY GENERATED IMAGES
function displayImages(){
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

displayImages();

//EVENT HANDLER

function handleNewRound(event){
  event.preventDefault();

  var clickedObject = event.target;
  console.log(clickedObject);
  console.log(event.target.id);

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

}

//EVENT LISTENER

imageDisplay.addEventListener('click', handleNewRound);
