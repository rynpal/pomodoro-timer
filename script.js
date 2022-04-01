$(document).ready(function () {
  //variable definitions
  let sound = document.getElementById("beep");
  let timeLeft = document.getElementById("time-left");
  let sessionEl = document.getElementById("session-length");
  let sessionLength = sessionEl.textContent;
  let breakEl = document.getElementById("break-length");
  let breakLength = breakEl.textContent;

  let totalSeconds = sessionEl.textContent * 60;
  let totalMinutes = totalSeconds / 60;
  let displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false });

  let displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
  "en-US",
  {
    minimumIntegerDigits: 2,
    useGrouping: false });



  var interval;
  let onBreak = false;
  let running = false;

  //render functions
  const timeDisplay = (tl, dm, ds) => {
    tl.textContent = dm + ":" + ds;
  };

  const resetDisplay = () => {
    sound.pause();
    sound.currentTime = 0;
    $("#timer-label").text("Time");
    $("#play").css("display", "block");
    $("#pause").css("display", "none");
    sessionEl.textContent = sessionLength = 25;
    breakEl.textContent = breakLength = 5;
    timeLeft = document.getElementById("time-left");
    totalSeconds = sessionEl.textContent * 60;
    totalMinutes = totalSeconds / 60;
    displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false });

    displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false });


    clearInterval(interval);
    onBreak = false;
    running = false;
    timeDisplay(timeLeft, displayMinutes, displaySeconds);
  };

  if (!timeLeft.textContent) {
    resetDisplay();
  }

  //start/stop function
  const countdown = () => {
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

    timeLeft = document.getElementById("time-left");
    totalSeconds--;
    totalMinutes = totalSeconds / 60;
    displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false });

    displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false });


    timeDisplay(timeLeft, displayMinutes, displaySeconds);
  };

  const setTimer = () => {
    interval = setInterval(countdown, 1000);
  };

  const playPause = () => {
    if (!running) {
      $("#timer-label").text("Session Started");
      $("#pause").css("display", "block");
      $("#play").css("display", "none");
      setTimer();
      running = !running;
    } else {
      $("#timer-label").text("Session Paused");
      $("#play").css("display", "block");
      $("#pause").css("display", "none");
      clearInterval(interval);
      running = !running;
    }
  };

  //button click assignments
  $("#break-decrement").click(function () {
    if (breakLength == 1) {
      return;
    }
    breakLength -= 1;
    breakEl.textContent = breakLength;
  });

  $("#break-increment").click(function () {
    if (breakLength == 60) {
      return;
    }
    breakLength += 1;
    breakEl.textContent = breakLength;
  });

  $("#session-decrement").click(function () {
    if (sessionLength == 1) {
      return;
    }
    sessionLength -= 1;
    sessionEl.textContent = sessionLength;
    if (running == false) {
      totalSeconds = sessionEl.textContent * 60;
      totalMinutes = totalSeconds / 60;
      displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false });

      displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false });


      timeDisplay(timeLeft, displayMinutes, displaySeconds);
    }
  });

  $("#session-increment").click(function () {
    if (sessionLength == 60) {
      return;
    }
    sessionLength += 1;
    sessionEl.textContent = sessionLength;
    if (running == false) {
      totalSeconds = sessionEl.textContent * 60;
      totalMinutes = totalSeconds / 60;
      displayMinutes = Math.floor(totalMinutes).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false });

      displaySeconds = (totalSeconds - displayMinutes * 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false });


      timeDisplay(timeLeft, displayMinutes, displaySeconds);
    }
  });

  $("#reset").click(resetDisplay);

  $("#start_stop").click(playPause);
});