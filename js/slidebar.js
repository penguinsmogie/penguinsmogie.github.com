var toggle = true;
var main = function() {
	/* Push the body and the nav over by 285px over */
	$('.icon-menu').click(function() {
		if toggle = true (
		  $('.menu').animate({
			left: "0px"
		  }, 200);
		  $('body').animate({
			left: "285px"
		  }, 200);
		  toggle = false;
		)
		else (
		  $('.menu').animate({
			left: "-285px"
		  }, 200);

		  $('body').animate({
			left: "0px"
		  }, 200);
		)
		});
		  

  /* Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });
};


$(document).ready(main);