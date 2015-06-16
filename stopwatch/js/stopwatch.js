var currentTime = 0;
var tickyClock = false;
var startDate = 0;
var pauseDate = 0;
var resumeDiff = 0;

function updateWatch() {
  //currentTime += 100;
  currentTime = Date.now() - startDate - resumeDiff;
  $("#watchFace").html(
    getDisplayTime(currentTime)
  );
}

function getDisplayTime(currentTime) {
  // 66054
  currentTime = currentTime/100;
  // 660.54
  currentTime = Math.round(currentTime);
  // 661
  currentTime = currentTime/10;
  // 66.1
  currentTime = currentTime.toFixed(1);
  return currentTime;
}

$(document).ready(function() {
  $("#startWatch").click(function() {
    if(!tickyClock) {
      if(!startDate) {
        startDate = Date.now();
      } else {
        // Since we're keying off the current date to calculate current time
        // we'll need to calculate the amount of time we pause the clock as well.
        // We'll store the date when we pause and then figure out how long we paused
        // when we resume by subtracting that date from the current one.
        resumeDiff = Date.now() - pauseDate + resumeDiff;
      }
      // Run updateWatch every 100ms
      tickyClock = window.setInterval(updateWatch, 100);
    }
    $(this).prop("disabled", true);
  });
  
  $("#stopWatch").click(function() {
    clearInterval(tickyClock);
    pauseDate = Date.now();
    tickyClock = false;
    $("#startWatch").prop("disabled", false);
  });
  
  $("#clearWatch").click(function() {
    currentTime = 0;
    startDate = 0;
    resumeDiff = 0;
    $("#watchFace").html(getDisplayTime(currentTime));
  });
});