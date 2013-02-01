/**
 * jQuery animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */

$(function() {
  $.fn.extend({
    defaultAnimate: $.fn.animate,
    animate: function(props, speed, easing, callback) {
      var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: callback || !callback && easing ||
            jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
          };

      return $(this).each(function() {
        var $this = $(this),
            altTransition,
            easing = options.easing || 'ease-in-out',
            prefix = (Modernizr.prefixed('transition').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));

            if (Modernizr.csstransitions) {
              $this.css(prefix, 'all ' + speed / 1000 + 's ' + easing).css(props);
              setTimeout(function() {
                $this.css(prefix, altTransition);
                if ($.isFunction(options.complete)) {
                  options.complete();
                }
              }, speed);
            }
            else {
              $this.defaultAnimate(props, options);
            }
      })
    }
  });
});