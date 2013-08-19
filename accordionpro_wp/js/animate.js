/**
 * jQuery animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */ /* build */

;(function($) {
  $.fn.extend({
    defaultAnimate: $.fn.animate,
    animate: function(props, speed, easing, callback) {
      var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: callback || !callback && easing || jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
          };

      return $(this).each(function() {
        var $this = $(this), easing, prefix;

          // check if transitions supported; only animate parent accordion element or slide list items
          if (Modernizr.csstransitions && ($this.hasClass('accordionPro') || $this.hasClass('slide'))) {

            // set default css easing function
            easing = options.easing || 'ease-in-out';

            // get prefix
            prefix = (Modernizr.prefixed('transition').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));

            // animate with css transitions
            $this.css(prefix, 'all ' + speed / 1000 + 's ' + easing).css(props);

            // callback
            setTimeout(function() {
              $this.css(prefix);
              if ($.isFunction(options.complete)) {
                options.complete();
              }
            }, speed);
          }
          else {
            // set default jQuery easing function
            options.easing = 'swing';

            // animate with jQuery
            $this.defaultAnimate(props, options);
          }
      })
    }
  });
})(jQuery);