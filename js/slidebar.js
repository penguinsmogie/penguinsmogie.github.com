var main = function() {
        /* Push the body and the nav over by 285px over */
        var toggle = false;
        $('.icon-menu').click(function() {
                if toggle = false (
                  $('.menu').animate({
                        left: "0px"
                  }, 200);
                  $('body').animate({
                        left: "285px"
                  }, 200);
                  toggle = true;
                )
                else if toggle = true (
                  $('.menu').animate({
                        left: "-285px"
                  }, 200);
 
                  $('body').animate({
                        left: "0px"
                  }, 200);
                  toggle = false;
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
        toggle = false;
  });
};
 
 
$(document).ready(main);