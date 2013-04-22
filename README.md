## Experimenting with hardware-accelerated CSS.

The resulting app is a little slideshow of five full-screen slides of kittens, courtesy of [placekitten](http://placekitten.com/).

### Lessons learned:

* WebKit also offers a simpler 2D method that moves the element on the x or y axis: **`translate(x, y)`**; **only `translate3d(x, y, z)` uses the GPU**
* To be sure that GPU is doing the work, surf to `about:flags` in Chrome, enable the FPS counter, and hit "Relaunch now" button at the bottom of the page. Chrome will now show a red FPS counter in the top-left corner of any screen whenever the GPU is active
* There are two useful command-line flags for Chrome to help debugging GPU acceleration:
	* `--show-composited-layer-borders`: shows a red border around elements that are being manipulated at the GPU level. Good for confirming your manipulations occur within the GPU layer.
	* `--show-paint-rects`: all non-GPU changes are painted and this throws a light border around all areas that are repainted. You can see the browser optimizing paint areas in action.
	
#### Libraries that leverage transitions & translations if present and fall-back to standard DOM style animations otherwise:
* [scripty2](http://scripty2.com/)
* [YUI transition](http://developer.yahoo.com/yui/3/transition/)
* [jQuery animate enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/)
* [jQuery.transform.js](https://github.com/louisremi/jquery.transform.js)
* [Modernizr](http://modernizr.com/):

		<div style="position:relative; height:120px;" class="hwaccel">
		  <div style="padding:5px; width:100px; height:100px; background:papayaWhip; position:absolute;" id="box"></div>
		</div>
		
		<script>
		document.querySelector('#box').addEventListener('click', moveIt, false);
		
		function moveIt(evt) {
		  var elem = evt.target;
		
		  if (Modernizr.csstransforms && Modernizr.csstransitions) {
		    // vendor prefixes omitted here for brevity
		    elem.style.transition = 'all 3s ease-out';
		    elem.style.transform = 'translateX(600px)';
		
		  } else {
		    // if an older browser, fall back to jQuery animate
		    jQuery(elem).animate({ 'left': '600px'}, 3000);
		  }
		}
		</script>

Inspired by: [http://mobile.smashingmagazine.com/2012/06/21/play-with-hardware-accelerated-css/](http://mobile.smashingmagazine.com/2012/06/21/play-with-hardware-accelerated-css/)

Additional read: [http://www.html5rocks.com/en/tutorials/speed/html5/](http://www.html5rocks.com/en/tutorials/speed/html5/)