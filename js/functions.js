// Official Website of  S U R V I V E
// Developed by Joshua Kemmer 2017

$(document).ready(function() {

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  Pace.on("done", function() {
    $(".cover").fadeOut(2000);
  });


  // VARIABLES__________________________________________________________________

  var sectionArray = $("body").find("section");
  var currentSection = 0;
  var windowWidth = $(window).innerWidth();
  var windowHeight = $(window).innerHeight();
  var windowScroll;
  var pageScrollInProgress = false;

  var myConfObj = {
    iframeMouseOver: false
  }

  var timerInitialized = false;


  // FUNCTIONS__________________________________________________________________

  // nav open/close (+icon animation class)
  $('#navIcon').tap(function() {
    $(this).toggleClass('open');

    event.preventDefault();
    if ($('header').hasClass('navOpen')) {
      $('header').removeClass('navOpen');
      $('header').addClass('navClose');
    } else {
      $('header').removeClass('navClose');
      $('header').addClass('navOpen');
    }
  });

  // creates clickable area to close nav when nav is opened
  $('#navReturnWrap').tap(function() {
    if ($('header').hasClass('navOpen')) {
      $('header').removeClass('navOpen');
      $('header').addClass('navClose');
      $('#navIcon').toggleClass('open');
    }
  });

  // closes nav when section is tapped
  $('#mainNav a').tap(function() {
    if ($('header').hasClass('navOpen')) {
      $('header').removeClass('navOpen');
      $('header').addClass('navClose');
      $('#navIcon').toggleClass('open');
    }
  });




  // expand video/delete comment when iframe clicked
  window.addEventListener('blur', function() {
    if (myConfObj.iframeMouseOver && windowWidth > 1024) {
      $('.generatedComment').fadeOut(250);
      $('.mediaWrap').css('width', '83.5%');
    }
  });

  document.getElementById('vimeo').addEventListener('mouseover', function() {
    myConfObj.iframeMouseOver = true;
  });
  document.getElementById('vimeo').addEventListener('mouseout', function() {
    myConfObj.iframeMouseOver = false;
  });




  // facial recognition hover animation (animates all)
  $('#identifyAll').mouseover(function() {
    $('#bandMembers li').css('border', '1px solid white').css('padding-top', '18%');
    $('.memberName').stop().fadeIn(100);
    $('.mask').stop().fadeOut(100);

    $('#identifyAll').mouseleave(function() {
      $('#bandMembers li').css('border', '1px solid #614e64').css('padding-top', '16%');
      $('.memberName').stop().fadeOut(100);
      $('.mask').stop().fadeIn(100);
    });
  });

  // facial recognition hover animation (animates individually)
  $('#bandMembers li:nth-of-type(1)').mouseover(function() {
    $('#bandMembers li:nth-of-type(1)').css('border', '1px solid white').css('padding-top', '18%');
    $('#michael').stop().fadeIn(100);
    $('#mask1').stop().fadeOut(100);

    $('#bandMembers li:nth-of-type(1)').mouseleave(function() {
      $('#bandMembers li:nth-of-type(1)').css('border', '1px solid #614e64').css('padding-top', '16%');
      $('#michael').stop().fadeOut(100);
      $('#mask1').stop().fadeIn(100);
    });
  });

  $('#bandMembers li:nth-of-type(2)').mouseover(function() {
    $('#bandMembers li:nth-of-type(2)').css('border', '1px solid white').css('padding-top', '18%');
    $('#mark').stop().fadeIn(100);
    $('#mask2').stop().fadeOut(100);

    $('#bandMembers li:nth-of-type(2)').mouseleave(function() {
      $('#bandMembers li:nth-of-type(2)').css('border', '1px solid #614e64').css('padding-top', '16%');
      $('#mark').stop().fadeOut(100);
      $('#mask2').stop().fadeIn(100);
    });
  });

  $('#bandMembers li:nth-of-type(3)').mouseover(function() {
    $('#bandMembers li:nth-of-type(3)').css('border', '1px solid white').css('padding-top', '18%');
    $('#kyle').stop().fadeIn(100);
    $('#mask3').stop().fadeOut(100);

    $('#bandMembers li:nth-of-type(3)').mouseleave(function() {
      $('#bandMembers li:nth-of-type(3)').css('border', '1px solid #614e64').css('padding-top', '16%');
      $('#kyle').stop().fadeOut(100);
      $('#mask3').stop().fadeIn(100);
    });
  });

  $('#bandMembers li:nth-of-type(4)').mouseover(function() {
    $('#bandMembers li:nth-of-type(4)').css('border', '1px solid white').css('padding-top', '18%');
    $('#adam').stop().fadeIn(100);
    $('#mask4').stop().fadeOut(100);

    $('#bandMembers li:nth-of-type(4)').mouseleave(function() {
      $('#bandMembers li:nth-of-type(4)').css('border', '1px solid #614e64').css('padding-top', '16%');
      $('#adam').stop().fadeOut(100);
      $('#mask4').stop().fadeIn(100);
    });
  });



  // typed.js types location upon scrolling to element
  $(window).scroll(function() {
    var hT = $('.scroll-to').offset().top,
      hH = $('.scroll-to').outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (timerInitialized == false && wS > (hT + hH - wH)) {
      //start timer
      timerInitialized = true;
      setTimeout(function() {

        $('#findingLocation').addClass("active");

        Typed.new('#findingLocation', {
          strings: ["Los Angeles, CA"],
          typeSpeed: 75
        });

      }, 2000);

    }
  });




  // easing
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function(x, t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });


  // EVENT HANDLERS_____________________________________________________________

  $('#mainNav a').tap(function() {
    event.preventDefault();
    var destination = $(this).attr('href');
    pageScrollInProgress = true;
    $('html, body').stop().animate({
      scrollTop: $(destination).offset().top - (-1)
    }, 900, 'easeInOutExpo', function() {
      pageScrollInProgress = false;
      setMainNav();
    });
  });



  //change nav selection based on section thresholds
  function checkNav() {
    if (windowScroll >= $(sectionArray[0]).offset().top && windowScroll < $(sectionArray[1]).offset().top && currentSection != 0) {
      currentSection = 0;

      if (pageScrollInProgress == false) {
        setMainNav();
      }


    } else if (windowScroll >= $(sectionArray[1]).offset().top && windowScroll < $(sectionArray[2]).offset().top && currentSection != 1) {
      currentSection = 1;

      if (pageScrollInProgress == false) {
        setMainNav();
      }


    } else if (windowScroll >= $(sectionArray[2]).offset().top && windowScroll < $(sectionArray[3]).offset().top && currentSection != 2) {
      currentSection = 2;

      if (pageScrollInProgress == false) {
        setMainNav();
      }


    } else if (windowScroll >= $(sectionArray[3]).offset().top && windowScroll < $(sectionArray[4]).offset().top && currentSection != 3) {
      currentSection = 3;

      if (pageScrollInProgress == false) {
        setMainNav();
      }


    } else if (windowScroll >= $(sectionArray[4]).offset().top && currentSection != 4 || $(window).scrollTop() + $(window).height() == $(document).height()) {
      currentSection = 4;

      if (pageScrollInProgress == false) {
        setMainNav();
      }

    }
  }

  function setMainNav() {
    if (currentSection == 0) {
      if ($("#mainNav a:first-of-type").hasClass("currentSection") == false) {
        $("#mainNav a:first-of-type").addClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(2)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(2)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(3)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(3)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(4)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(4)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(5)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(5)").removeClass("currentSection");
      }
    }

    if (currentSection == 1) {
      if ($("#mainNav a:first-of-type").hasClass("currentSection") == true) {
        $("#mainNav a:first-of-type").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(2)").hasClass("currentSection") == false) {
        $("#mainNav a:nth-of-type(2)").addClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(3)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(3)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(4)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(4)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(5)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(5)").removeClass("currentSection");
      }
    }

    if (currentSection == 2) {
      if ($("#mainNav a:first-of-type").hasClass("currentSection") == true) {
        $("#mainNav a:first-of-type").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(2)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(2)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(3)").hasClass("currentSection") == false) {
        $("#mainNav a:nth-of-type(3)").addClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(4)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(4)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(5)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(5)").removeClass("currentSection");
      }
    }

    if (currentSection == 3) {
      if ($("#mainNav a:first-of-type").hasClass("currentSection") == true) {
        $("#mainNav a:first-of-type").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(2)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(2)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(3)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(3)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(4)").hasClass("currentSection") == false) {
        $("#mainNav a:nth-of-type(4)").addClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(5)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(5)").removeClass("currentSection");
      }
    }

    if (currentSection == 4) {
      if ($("#mainNav a:first-of-type").hasClass("currentSection") == true) {
        $("#mainNav a:first-of-type").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(2)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(2)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(3)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(3)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(4)").hasClass("currentSection") == true) {
        $("#mainNav a:nth-of-type(4)").removeClass("currentSection");
      }
      if ($("#mainNav a:nth-of-type(5)").hasClass("currentSection") == false) {
        $("#mainNav a:nth-of-type(5)").addClass("currentSection");
      }
    }
  }


  $(window).scroll(function() {
    windowHeight = $(window).innerHeight();
    windowScroll = $(window).scrollTop();

    checkNav();
  });

  $(window).resize(function() {
    windowWidth = $(window).innerWidth();
    windowHeight = $(window).innerHeight();

    checkNav();
  });


  // INITIALIZATION_____________________________________________________________

});
