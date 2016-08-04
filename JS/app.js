'use strict';

//global variables

var leftImage = document.getElementById('left');
var centerImage = document.getElementById('center');
var rightImage = document.getElementById('right');
var numberOfClicks = 0;
var totalClicksAllowed = 25;
var imageDisplay = document.getElementById('imageDisplay');
var seeResults = document.getElementById('seeResults');
var runAgain = document.getElementById('runAgain');
var chartDrawn;
var barChart;
var allImagesArrayStringified;


//arrays
//for all product images
var allImages = [];
//to hold my first random number array
var randomNumberArray = [];
//second random number array
var lastNumberArray = [100, 150, 250];
//capturing names and votes
var names = [];
var votes = [];
var displays = [];
var votePercent = [];

//Object constructor
function ImageFinder(name, filePath){
  this.name = name;
  this.filePath = filePath;
  this.displayCount = 0;
  this.voteCount = 0;
  allImages.push(this);
  names.push(this.name);
};

function createNewObjects(){
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
};

//Conditional to check whether there is stored data, and if so, push stored data into all images array. If not, create objects from scratch.
if (localStorage.allImagesArrayStringified) {
  console.log('Local Storage has content');
  var storedData = JSON.parse(localStorage.allImagesArrayStringified);
  allImages = storedData;

} else {
  console.log('Local Storage is empty');
  createNewObjects();
}

//random number generator to pick images from the array
//create random numbers, while loops ensure that, if there are any comparisons with the lastNumberArray or any random numbers already created, the loop runs again.
//Worked very closely with Maelle, Lee, and Britt on this section
function randomNumberGenerator(){
  return Math.floor(Math.random() * 20);
};

function compareImages(){
  //create a random number and compare to numbers in lastNumberArray.
  var randomNumber = randomNumberGenerator();
  while (randomNumber === lastNumberArray[0] || randomNumber === lastNumberArray[1] || randomNumber === lastNumberArray[2]){
    randomNumber = randomNumberGenerator();
  };

  var randomNumber1 = randomNumberGenerator();
  while (randomNumber1 === randomNumber || randomNumber1 === lastNumberArray[0] || randomNumber1 === lastNumberArray[1] || randomNumber1 === lastNumberArray[2]){
    randomNumber1 = randomNumberGenerator();
  };

  var randomNumber2 = randomNumberGenerator();
  while (randomNumber2 === randomNumber || randomNumber2 === randomNumber1 || randomNumber2 === lastNumberArray[0] || randomNumber1 === lastNumberArray[1] || randomNumber1 === lastNumberArray[2]){
    randomNumber2 = randomNumberGenerator();
  };
  //push the random numbers to an array
  randomNumberArray.push(randomNumber, randomNumber1, randomNumber2);
  console.log(randomNumber, randomNumber1, randomNumber2);
};

  //use the random numbers to populate html elements left, right, and center (blank img tags) with images from the array

function displayImages (){
  compareImages();
  leftImage.src = allImages[randomNumberArray[0]].filePath;
  leftImage.id = allImages[randomNumberArray[0]].name;
  allImages[randomNumberArray[0]].displayCount++;

  centerImage.src = allImages[randomNumberArray[1]].filePath;
  centerImage.id = allImages[randomNumberArray[1]].name;
  allImages[randomNumberArray[1]].displayCount++;

  rightImage.src = allImages[randomNumberArray[2]].filePath;
  centerImage.id = allImages[randomNumberArray[2]].name;
  allImages[randomNumberArray[2]].displayCount++;

  lastNumberArray = [];
  lastNumberArray.push(randomNumberArray[0], randomNumberArray[1], randomNumberArray[2]);
  randomNumberArray = [];
  seeResults.style.display = 'none';
};

//First Chart Drawing-- inspired by Sam's lecture and assigned readings, helped by Britt

var data = {
  labels: names, // array of names declared above
  datasets: [
    {
      label: 'Vote Tally',
      data: votes, // array of votes declared above
      backgroundColor: '#CD5C5C',
      hoverBackgroundColor: 'purple',
    },
    {
      label: 'Display Tally',
      data: displays,
      backgroundColor: '#59BD98',
      hoverBackgroundColor: 'purple',
    }]
};

function drawChart() {
  var ctx = document.getElementById('productChart').getContext('2d');
  barChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero: true
      }
    }]
  });
  chartDrawn = true;
}

//Second Chart Drawing

var data1 = {
  labels: names, // array of names declared above
  datasets: [
    {
      label: 'Percentage of Clicks per Displays',
      data: votePercent, // array of votes declared above
      backgroundColor: [
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'mint',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy'
      ],
      hoverBackgroundColor: 'purple',
    }]
};

function drawChart1() {
  var ctx = document.getElementById('percentageChart').getContext('2d');
  barChart = new Chart(ctx,{
    type: 'polarArea',
    data: data1,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero: true
      }
    }]
  });
  chartDrawn = true;
}

// Getting updated data for the charts
function updateChartArrays() {
  for (var i = 0; i < allImages.length; i++) {
    names[i] = allImages[i].name;
    votes[i] = allImages[i].voteCount;
    displays[i] = allImages[i].displayCount;
    votePercent[i] = (allImages[i].voteCount / allImages[i].displayCount).toFixed(2) * 100;
  };
};

// Tallying votes and display counts for the charts
function tallyVote(thisProduct) {
  for (var i = 0; i < allImages.length; i++) {
    if (thisProduct === allImages[i].name){
      allImages[i].voteCount++;
      allImages[i].displayCount++;
      updateChartArrays();
    }
  }
}
//
function hideChart() {
  document.getElementById('chartHolder').hidden = true;
  document.getElementById('percentageChartHolder').hidden = true;
};


// //EVENT HANDLER
function handleNewRound(event){
  event.preventDefault();
  // cycle through each product in the allImages array and tally clicks on each image and total clicks for the survey
  for (var i = 0; i < allImages.length; i++){
    if(allImages[i].name === event.target.id){
      allImages[i].voteCount++;
      numberOfClicks++;
      //store clicks as JSON data
    };
  };

//Make sure that the survey only runs 25 times, and load the page
  if (numberOfClicks < totalClicksAllowed) {
    displayImages();
    seeResults.style.display = 'none';
    updateChartArrays();
    allImagesArrayStringified = JSON.stringify(allImages);
    localStorage.setItem('allImagesArrayStringified', allImagesArrayStringified);
  } else if (numberOfClicks === totalClicksAllowed){
    imageDisplay.removeEventListener('click', handleNewRound);
    tallyVote();
    seeResults.style.display = 'table';
  };
};

// Call our functions on load

displayImages();

//EVENT LISTENERS

imageDisplay.addEventListener('click', handleNewRound);


document.getElementById('seeResults').addEventListener('click', function(){
  drawChart();
  drawChart1();
});

document.getElementById('runAgain').addEventListener('click', function(){
  hideChart();
  displayImages();
});
