;(function($) {

  function AccordionPro(elem, options) {
    /**
     * Merge defaults with options in new settings object
     */

    var settings = $.extend({}, this.defaults, options);


    /**
     * "Globals"
     */

    var parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : 48 },
        padding = 0,
        border = 0,
        offset = 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing,
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent');


    /**
     * Plugin setup
     */

    var setup = {
      globalDimensions : function() {
        elem
          .outerWidth(horizontal ? settings.horizontalWidth : settings.verticalWidth)
          .outerHeight(horizontal ? settings.horizontalHeight : settings.verticalHeight);
      },

      globalStyles : function() {
        var classNames = 'accordionPro ';

        // set horizontal classname
        classNames += horizontal ? 'horizontal ' : 'vertical ';

        // theme
        classNames += settings.theme + ' ';

        // rounded
        classNames += settings.rounded ? 'rounded ' : '';

        // rtl
        classNames += settings.rtl ? 'rtl ' : '';

        // start closed
        classNames += settings.startClosed ? 'closed ' : '';

        // fitToContent
        classNames += (!horizontal && fitToContent) ? 'fitToContent ' : '';

        // scale images
        classNames += settings.scaleImages ? 'scaleImages ' : '';

        // set classnames
        elem.addClass(classNames);
      },

      slideDimensions : function() {

      },

      slidePositions : function() {

      },

      slideStyles : function() {

      },

      events : function() {

      },

      internetExploder : function() {

      },

      init : function() {
        this.globalDimensions();
        this.globalStyles();
        this.slideDimensions();
        this.slidePositions();
        this.slideStyles();

      }
    };

    setup.init();
    return this.methods;
  }


  /**
   * Plugin defaults
   */

  AccordionPro.prototype.defaults = {
    /* layout */
    orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
    startClosed : false,                    // start in a closed position
    firstSlide : 1,                         // displays slide (n) on page load

    /* aesthetics */
    theme : 'basic',                        // basic, dark, light, stitch or transparent
    rounded : false,                        // square or rounded corners
    rtl : false,                            // right to left layout
    showSlideNumbers : true,                // display numbers on slides

    /* horizontal accordion options */
    responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
    scaleImages : true,                     // scales images to fit slide width and height
    horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
    horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

    /* vertical accordion options */
    verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
    verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
    verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

    /* events */
    activateOn : 'click',                   // click or mouseover
    touchEnabled : true,                    // touch events?
    onSlideOpen : function() {},            // callback on slide open
    onSlideClose : function() {},           // callback on slide animation complete

    /* animations */
    autoPlay : false,                       // automatically cycle through slides
    cycleSpeed : 6000,                      // time between slide cycles
    slideSpeed : 800,                       // slide animation speed
    easing : 'ease-in-out',                 // animation easing

    /* miscellaneous */
    pauseOnHover : true,                    // pause on hover
    linkable : false                        // link slides via hash
  };





  /**
   * Core scale and animation methods
   */

  AccordionPro.prototype.core = {

  };


  /**
   * Public methods for triggering animation events
   */

  AccordionPro.prototype.methods = {
    play : function(index) {

    },

    stop : function() {

    },

    next : function() {

    },

    prev : function() {

    },

    destroy : function() {

    }
  };


  /**
   * Add plugin to $.fn
   */

  $.fn.accordionPro = function(method) {
    var elem = this,
        instance = elem.data('accordionPro');

    // if creating a new instance
    if (typeof method === 'object' || !method) {
      return elem.each(function() {
        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        elem.data('accordionPro', new AccordionPro(elem, method));
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // chainable methods
      instance[method].call(elem);
      return elem;
    }
  };

})(jQuery);