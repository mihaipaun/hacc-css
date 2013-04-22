## Experimenting with hardware-accelerated CSS.

The resulting app is a little slideshow of five full-screen slides of kittens, courtesy of [placekitten](http://placekitten.com/).

### Lessons learned:

* WebKit also offers a simpler 2D method that moves the element on the x or y axis: **translate(x, y)**; only **translate3d(x, y, z) uses the GPU**

Inspired by: [http://mobile.smashingmagazine.com/2012/06/21/play-with-hardware-accelerated-css/](http://mobile.smashingmagazine.com/2012/06/21/play-with-hardware-accelerated-css/)