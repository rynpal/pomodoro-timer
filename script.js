//variable definitions
let sound = document.getElementById("beep");
let sessionEl = document.getElementById("session-length");
let sessionLength = sessionEl.textContent;
let breakEl = document.getElementById("break-length");
let breakLength = breakEl.textContent;

var totalSeconds; //global variable - total seconds that are on the timer
var totalMinutes; //global variable - total minutes that are on the timer

var interval; //the thing that actually does the countdown
let onBreak = false;
let isRunning = false;

//only executes whenthe page is first loaded
$(document).ready(function () {
  resetInitializeDisplay();
});

//----------Functions-------------//

//Set the timer display
function timeDisplay() {
  var displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  var displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  );

  document.getElementById("time-left").textContent =
    displayMinutes + ":" + displaySeconds;
}

function resetInitializeDisplay() {
  sound.pause();
  sound.currentTime = 0;
  $("#timer-label").text("Time");
  $("#play").css("display", "block");
  $("#pause").css("display", "none");
  sessionEl.textContent = sessionLength = 25;
  breakEl.textContent = breakLength = 5;
  totalSeconds = sessionEl.textContent * 60;
  totalMinutes = totalSeconds / 60;

  clearInterval(interval);
  onBreak = false;
  isRunning = false;
  timeDisplay();
}

function playPause() {
  if (!isRunning) {
    $("#timer-label").text("Session Started");
    $("#pause").css("display", "block");
    $("#play").css("display", "none");
    setTimer();
    isRunning = !isRunning;
  } else {
    $("#timer-label").text("Session Paused");
    $("#play").css("display", "block");
    $("#pause").css("display", "none");
    clearInterval(interval);
    isRunning = !isRunning;
  }
}

//actually does the counting down on the page.  Passed into the setInternval() function
function countdown() {
  if (!totalSeconds && !onBreak) {
    sound.currentTime = 0;
    sound.play();
    $("#timer-label").text("Break Started");
    totalSeconds = breakEl.textContent * 60 + 1;
    onBreak = !onBreak;
  }

  if (!totalSeconds && onBreak) {
    sound.currentTime = 0;
    sound.play();
    $("#timer-label").text("Session Started");
    totalSeconds = sessionEl.textContent * 60 + 1;
    onBreak = !onBreak;
  }

  totalSeconds--;
  totalMinutes = totalSeconds / 60;

  timeDisplay();
}

function setTimer() {
  interval = setInterval(countdown, 1000);
}

//----------Button Clicks-------------//

//increment the session setting
$("#session-increment").click(function () {
  if (sessionLength == 60) {
    return;
  }
  sessionLength += 1;
  sessionEl.textContent = sessionLength;
  if (isRunning == false) {
    totalSeconds = sessionEl.textContent * 60;
    totalMinutes = totalSeconds / 60;
    timeDisplay();
  }
});

//decrement the session setting
$("#session-decrement").click(function () {
  if (sessionLength == 1) {
    return;
  }
  sessionLength -= 1;
  sessionEl.textContent = sessionLength;
  if (isRunning == false) {
    totalSeconds = sessionEl.textContent * 60;
    totalMinutes = totalSeconds / 60;

    timeDisplay();
  }
});

//decrement the break setting
$("#break-decrement").click(function () {
  if (breakLength == 1) {
    return;
  }
  breakLength -= 1;
  breakEl.textContent = breakLength;
});

//increment the break setting
$("#break-increment").click(function () {
  if (breakLength == 60) {
    return;
  }
  breakLength += 1;
  breakEl.textContent = breakLength;
});

$("#reset").click(function () {
  resetInitializeDisplay();
});

$("#start_stop").click(function () {
  playPause();
});
