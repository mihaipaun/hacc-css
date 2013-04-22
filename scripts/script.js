$(function() {
  var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0,
      slideCount = $('.slide').length;

  // cross-platform listeners for basic "dragging" functionality, which we'll use to do the page sliding
  $('html').live('mousedown touchstart', slideStart);
  $('html').live('mouseup touchend', slideEnd);
  $('html').live('mousemove touchmove', slide);

  // triggered on a mousedown or touchstart event
  function slideStart(event) {

    // for "cross-platform-ness", redefine the event parameter to the first touch property in our touches collection (i.e. the first finger)
    if (event.originalEvent.touches) {
      event = event.originalEvent.touches[0];
    }

    // then, we detect whether the user is not sliding yet
    if (sliding == 0) {
      sliding = 1;

      // store the mouse or touch position where the user initiated the slide
      startClientX = event.clientX;
    }
  }

 function slide(event) {
    event.preventDefault();

    if (event.originalEvent.touches) {
      event = event.originalEvent.touches[0];
    }

    // store the number of pixels that we've moved since our mousedown or touchstart event
    var deltaSlide = event.clientX - startClientX;

    // this means the user has moved for the first time; we can consider this the actual "slide start" event
    if (sliding == 1 && deltaSlide != 0) {

      // this means the user is actually moving
      sliding = 2;

      // store the current pixels that the entire #slides container was already changed to
      startPixelOffset = pixelOffset;
    }

    // this means the user was already moving
    if (sliding == 2) {

      // set this to its initial value of 1, which means that the user is sliding exactly 1 pixel for every pixel of mouse or touch movement
      var touchPixelRatio = 1;

      // check whether the user is sliding the first slide to the right or the last slide to the left
      if ((currentSlide == 0 && event.clientX > startClientX) ||
          (currentSlide == slideCount - 1 && event.clientX < startClientX)) {

        // setting this to 3 means the user has to move their mouse or finger by 3 pixels just to offset the slides by 1 pixel
        touchPixelRatio = 3;
      }

      // calculate the number of pixels that we need to offset #slides (Apple's rubber-band effect)
      pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;

      // move x by the pixelOffset's number of pixels, and leave y and z alone
      $('#slides').css('-webkit-transform', 'translate3d(' + pixelOffset + 'px,0,0)').removeClass();
    }
  }

  // when the user stops sliding, we want the previous or next slide to smoothly animate into view
  function slideEnd(event) {
    if (sliding == 2) {
      sliding = 0;

      // we need to know which slide should be in view
      currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
      currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
      pixelOffset = currentSlide * -$('body').width();
      $('#temp').remove();

      // dynamically add a new CSS rule
      $('<style id="temp">#slides.animate{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');

      // now we've got the current (runtime) style set to the current pixelOffset value, and the animate class is set to point #slides to the final position
      // swap the style for a class, and the transition will take over
      $('#slides').addClass('animate').css('-webkit-transform', '');
    }
  }
});