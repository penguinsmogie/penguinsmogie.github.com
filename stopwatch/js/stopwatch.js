var currentTime = 0;
// a value used to display the current time taken by the stopwatch
var tickyClock = false;
// a value used to show whether or not the stopwatch is currently ticking
var startDate = 0;
// a value that stores when the start button is hit
// this value is critical when starting from resumed times
var pauseDate = 0;
// a value that denotes when a user has stopped the stopwatch
// required to make sure the watch does not continue to magically "count up" when "stopped"
var resumeDiff = 0;
// a value used to correctly add multiple stopwatch resumes together

function updateWatch() {
  currentTime = Date.now() - startDate - resumeDiff;
  // if starting from the beginning, value will return zero as currentTime was set to Date.now() when hitting start
  // currentTime will continue to increase at .1 second increments from interval function, this "counting up" on stopwatch
  // if the "timer" is paused and then resumed, the "resumeDiff" is calculated at the time of the start press and used here
  
		// Math example one (resuming from a stop)
		// startDate = 6:00pm
		// currentTime = 3 minutes
		// pauseDate = 6:03pm
		// Date.now() = 6:10pm
		// 
		// resumeDiff = Date.now() - pauseDate + resumeDiff
		// resumeDiff = 6:10pm   -   6:03pm
		// resumeDiff = 7 minutes
		// 
		// Date.now() - startDate - resumeDiff
		// 6:10pm   -   6:00pm   -   7 minutes
		// 10 minutes   -   7 minutes
		// currentTime = 3 minutes
		// 
		// 
		// Math example two (additive resuming)
		// startDate = 6:00pm
		// currentTime = 8 minutes
		// pauseDate = 6:15pm
		// resumeDiff = 7 minutes
		// Date.now = 6:30pm
		// 
		// 
		// resumeDiff = Date.now() - pauseDate + resumeDiff
		// resumeDiff = 6:30pm    -   6:15pm   +   7 minutes
		// resumeDiff = 22 minutes
		// 
		// 
		// Date.now() - startDate - resumeDiff
		// 6:30pm   -   6:00pm   -   22 minutes
		// 30 minutes - 22 minutes
		// 8 minutes
		
  $("#watchFace").html(
    getDisplayTime(currentTime)
  );
  // this sets the html id equal to the value generated here
}

function getDisplayTime(currentTime) {
// modulated millisecond to second converter function
  
  // 66054 (start with raw millisecond value)
  currentTime = currentTime/100;
  // 660.54 (converts so that Math.round will hit the correct place)
  currentTime = Math.round(currentTime);
  // 661 (round to what will become 10th of a second)
  currentTime = currentTime/10;
  // 66.1 (convert to seconds)
  currentTime = currentTime.toFixed(1);
  // makes the number display to one decimal point eg. 15.0
  return currentTime;
}

$(document).ready(function() {
  $("#clearWatch").prop("disabled", true);
  // the clear button is manually disabled upon side load
  
  $("#startWatch").click(function() {
    if(!tickyClock) {
	// checks to see if the stopwatch is currently running
      if(!startDate) {
	  // checks to see if the stopwatch is currently at zero
        startDate = Date.now();
		// by setting the startDate equal to date.now, the display will
		// show "0" to start with, and then as Date.now() will continue
		// to passively increase versus the stored startDate
      } else {
        // Since we're keying off the current date to calculate current time
        // we'll need to calculate the amount of time we pause the clock as well.
        // We'll store the date when we pause and then figure out how long we paused
        // when we resume by subtracting that date from the current one.
        resumeDiff = Date.now() - pauseDate + resumeDiff;
		// math involved to add on the "current value" of the stopwatch when resuming
      }
      // Run updateWatch every 100ms
      tickyClock = window.setInterval(updateWatch, 100);
	  // this is the line that gets the currentTime value to "count up"
    }
    $(this).prop("disabled", true);
	$("#clearWatch").prop("disabled", true);
	// upon clicking start, the start and clear button become disabled
  });
  
  $("#stopWatch").click(function() {
    clearInterval(tickyClock);
	// the interval no longer continues
    pauseDate = Date.now();
	// stores the current "stopwatch value" so that it may be resumed if necessary
    tickyClock = false;
	// marks the watch as no longer continuing to "count up"
    $("#startWatch").prop("disabled", false);
	$("#clearWatch").prop("disabled", false);
	// the start and clear button are re-enabled
  });
  
  $("#clearWatch").click(function() {
  // clears all values, effectively completely resetting the watch
    currentTime = 0;
    startDate = 0;
    resumeDiff = 0;
	// pauseDate is not reset because it is hard set to Date.now()
	// upon hitting stop, and thus will be "cleared" naturally
    $("#watchFace").html(getDisplayTime(currentTime));
	$("#clearWatch").prop("disabled", true);
  });
});