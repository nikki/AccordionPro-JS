/*!
 * Project:    Accordion Pro JS - a responsive accordion plugin for jQuery
 * Author:     Nicola Hibbert
 * URL:        http://codecanyon.net/item/accordion-pro-js-responsive-jquery-accordion/5480772?ref=StitchUI
 *
 * Version:    2.0
 * Copyright:  (c) 2010-2015 Nicola Hibbert
 */

/*!
 * jQuery Animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */

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
        tab = { w : 0, h : settings.tabWidth },
        panels = tabs.next(),
        padding = 0,
        border = 0,
        offset = 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        easing = 'ease-in-out',
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent');


    /**
     * Plugin setup
     */


      // // setup dimensions, styles, slide positions and events
      // setup.styles();

      // // check images are loaded before setting up slide positions
      // imagesLoaded(elem, function() {
      //   setup.dimensions();
      //   setup.ie();
      //   elem.delay(500).css('display', 'block'); // !!! images loaded -> set plugin to visible before slidepositions need setting
      //   setup.slidePositions();
      //   setup.events();
      //   if (settings.startClosed) setup.startClosed();
      // });


    var setup = {

      /**
       * Set classes
       */

      setPluginClasses : function() {
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

      setSlideClasses : function() {
        // add slide number to each slide
        slides.each(function(index) {
          $(this).addClass('slide slide-' + index);
        });
      },


      /**
       * Set dimensions
       */

      setPluginDimensions : function() {
        // set plugin height and width
        elem
          .outerWidth(horizontal ? settings.horizontalWidth : settings.verticalWidth)
          .outerHeight(horizontal ? settings.horizontalHeight : settings.verticalHeight);
      },

      calcBoxDimensions : function() {
        var firstPanel = slides.eq(0).children('div');

        // cache parent height and width values
        parent.w = elem.width();
        parent.h = elem.height();

        // calculate slide border
        border = elem.outerHeight() - elem.height();

        // calculate slide offset (once only)
        offset =
          parseInt(firstPanel.css('marginLeft'), 10) ||
          parseInt(firstPanel.css('marginRight'), 10) ||
          parseInt(firstPanel.css('marginBottom'), 10) || 0;

        // calculate padding
        padding = parseInt(elem.css('padding' + horizontal ? 'Left' : 'Top'), 10) + parseInt(elem.css('padding' + horizontal ? 'Right' : 'Bottom'), 10);
      },

      calcSlideDimensions : function(index, panelH) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = slide.w + tab.h;
          calc.height = '100%';
          calc.position = { left : index * tab.h, top : 0 };

          if (settings.rtl) {
            calc.position = { left : 'auto', right : index * tab.h, top : 0 };
          }
        } else {
          if (fitToContent) {
            calc.height = transparent ? panelH : panelH + tab.h;
          } else {
            calc.height = slide.h + tab.h; // fixed height
          }

          calc.width = '100%';
          calc.position = { top : index * tab.h, left : 0 };
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },

      setSlideDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },

      setSlidesDimensions : function() {
        var _this = this;

        // calculate global slide dimensions
        if (horizontal) {
          slide.w = parent.w - slide.l * tab.h;
          slide.h = parent.h;
        } else {
          slide.w = tabs.eq(0).width(); // px value
          slide.h = parent.h - slide.l * tab.h;
        }

        // set dimensions of each slide
        slides.each(function(index) {
          var $this = $(this),
              panelH = $this.children(':last-child').height(),
              calc = _this.calcSlideDimensions(index, panelH);

          _this.setSlideDimensions.call($this, calc);
        });
      },

      setTabDimensions : function() {
        this
          .width(tab.w)
          .height(tab.h);
      },

      setTabsDimensions : function() {
        var _this = this;

        // calculate global tab dimensions
        tab.w = horizontal ? slide.h : '100%';

        // set dimensions of each tab
        tabs.each(function(index) {
          _this.setTabDimensions.call($(this));
        });
      },

      calcPanelDimensions : function(index) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = transparent ? slide.w + tab.h : slide.w - offset;
          calc.height = slide.h;
          calc.position = { left : transparent ? 0 : tab.h, top : 0 };

          if (settings.rtl) {
            calc.position = transparent ? { left : 'auto', right : 0 - offset, top : 0 } : { left : 'auto', right : tab.h - offset, top : 0 };
          }
        } else {
          if (fitToContent) {
            calc.height = $this.children('div').height();

          } else {
            // fixed height
            css.panel.height = transparent ? css.slide.height : css.slide.height - tab.h - offset;
          }

          // panel positions
          css.panel.position = transparent ? { top : 0, left : 0 } : { top : tab.h, left : 0 };


        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },

      setPanelDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },

      setPanelsDimensions : function() {
        var _this = this;

        panels.each(function(index) {
          var calc = _this.calcPanelDimensions(index);
          _this.setPanelDimensions.call($(this), calc);
        });
      },

      setSelectedSlideDimensions : function() {
        var selected = slides.filter('.selected');

        // if no selected slide, set first slide as selected if
        // startClosed option not enabled
        if (!selected.length && !settings.startClosed) {
          slides.eq(settings.firstSlide - 1).addClass('selected');
          selected = slides.filter('.selected');
        }
      },

      internetExploder : function() {
        var ua = navigator.userAgent,
            index = ua.indexOf('MSIE');

        // not ie
        if (index < 0) return;

        // ie
        if (index !== -1) {
          ua = ua.slice(index + 5, index + 7);
          ua = +ua;

          // ie 9+ doesn't need additional styles...
          if (ua >= 9) return;

          // ... but ie 8 does :(
          if (ua === 8) {

          }

          // ie 7 and below
          if (ua <= 7) {
            methods.destroy();
            throw new Error('This plugin supports IE8+ only.');
          }

          // add ie classes for css fallbacks
          elem.addClass('ie ie' + ua);
        }
      },

      events : function() {

      },




      init : function() {
        this.setPluginClasses();
        this.setSlideClasses();

        this.setPluginDimensions();
        this.calcBoxDimensions();

        this.setSlidesDimensions();
        this.setTabsDimensions();
        // this.setPanelsDimensions();
        // this.setSelectedSlideDimensions();
        // this.internetExploder();
        // this.events();
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

    /* tabs */
    tabWidth : 48,                          // set tab width
    showSlideNumbers : true,                // display numbers on slides

    /* aesthetics */
    theme : 'basic',                        // basic, dark, light, stitch or transparent
    rounded : false,                        // square or rounded corners
    rtl : false,                            // right to left layout

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
      // remove generated styles, classes, data, events
      this
        .off('.accordionPro')
        .removeData('accordionPro')
        .removeAttr('style')
        .removeClass();
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