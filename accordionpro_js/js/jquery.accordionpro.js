/**
 * Project:    Accordion Pro - a responsive accordion plugin for jQuery
 * Author:     Nicola Hibbert
 * URL:        http://codecanyon.net/item/accordion-pro/1506395?ref=nicolahibbert
 * Demo:       http://accordionpro.nicolahibbert.com/
 *
 * Version:    1.0
 * Copyright:  (c) 2010-2013 Nicola Hibbert
 */ /* build */

;(function($) {

  var AccordionPro = function(elem, options) {
    var defaults = {},
        settings = {},
        methods = {},
        setup = {},
        core = {};

    /**
     * Plugin defaults
     */

    defaults = {
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
      scaleImagesToFit : true,                // scales images to fit slide width and height
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
     * Merge defaults with options in new settings object
     */

    settings = $.extend({}, defaults, options);

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
        orientation = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing,
        fitToContent = !orientation && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent');

    /**
     * Public methods for triggering animation events
     */

    // start elem animation
    methods.play = function(index) {
      var next;
      if (core.playing) return;

      // assign next slide value
      next = core.nextSlide(index && index);

      // start autoplay
      core.playing = setTimeout(function() {
        tabs.eq(next()).trigger('click.accordionPro');
      }, settings.cycleSpeed);
    };

    // stop elem animation
    methods.stop = function() {
      clearTimeout(core.playing);
      core.playing = 0;
    };

    // trigger next slide
    methods.next = function() {
      methods.stop();
      tabs.eq(core.currentSlide === slide.length - 1 ? 0 : core.currentSlide + 1).trigger('click.accordionPro');
    };

    // trigger previous slide
    methods.prev = function() {
      methods.stop();
      tabs.eq(core.currentSlide - 1).trigger('click.accordionPro');
    };

    // destroy plugin instance
    methods.destroy = function() {
      // stop autoplay
      methods.stop();

      // remove hashchange and resize events bound to window
      $(window).off('.accordionPro');

      // remove generated styles, classes, data, events
      elem
        .off('.accordionPro')
        .removeData('accordionPro')
        .removeAttr('style')
        .removeClass('accordionPro horizontal vertical basic dark light stitch transparent rounded rtl closed responsive scaleImages')
        .find('li > :first-child')
        .off('.accordionPro')
        .end()
        .find('b')
        .remove();

      slides
        .removeClass('slide selected')
        .removeAttr('style')
        .removeAttr('data-slide-name')
        .children()
        .removeAttr('style');
    };

    // poke around the internals (NOT CHAINABLE)
    methods.debug = function() {
      return {
        elem : elem,
        defaults : defaults,
        settings : settings,
        methods : methods,
        setup : setup,
        core : core
      };
    };

    /**
     * Internal plugin setup methods
     */

    setup.styles = function() {
      // set parent theme and corner style
      elem
        .outerWidth(orientation ? settings.horizontalWidth : settings.verticalWidth)
        .outerHeight(orientation ? settings.horizontalHeight : settings.verticalHeight)
        .addClass('accordionPro')
        .addClass(orientation ? 'horizontal' : 'vertical')
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl')
        .addClass(settings.scaleImagesToFit && 'scaleImages');

      // add slide class to each slide
      slides.addClass('slide');

      // cache slide length
      slide.l = slides.length;
    };

    setup.dimensions = function() {
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
      if (orientation) {
        padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10);
      } else {
        padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10);
      }
    };

    setup.getSlideCss = function(index, selected) {
      var fitToContentHeight = 0,
          css = {
            slide : {},
            tab : {},
            panel : {}
          };

      if (orientation) { // horizontal
        // calculate global slide dimensions
        slide.w = parent.w - slide.l * tab.h;
        slide.h = parent.h;

        // calculate slide properties
        css.slide.width = slide.w + tab.h;
        css.slide.height = '100%';
        css.slide.position = { left : index * tab.h, top : 0 };

        // calculate tab properties
        css.tab.width = slide.h;

        // calculate content panel properties
        if (!transparent) {
          css.panel.width = slide.w - offset;
          css.panel.height = slide.h;
          css.panel.position = { left : tab.h, top : 0 };
        } else {
          css.panel.width = slide.w + tab.h;
          css.panel.height = slide.h;
          css.panel.position = { left : 0, top : 0 };
        }

        // adjust for rtl if necessary
        if (settings.rtl) {
          css.slide.position = { left : 'auto', right : index * tab.h, top : 0 };
          if (!transparent) {
            css.panel.position = { left : 'auto', right : tab.h - offset, top : 0 };
          } else {
            css.panel.position = { left : 'auto', right : 0 - offset, top : 0 };
          }
        }

        // compensate for pre-selected slide
        if (selected.length && index > slides.index(selected)) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
      } else { // vertical
        // calculate global slide dimensions
        slide.w = tabs.eq(0).width(); // px value
        slide.h = parent.h - slide.l * tab.h;

        // calculate slide properties
        if (fitToContent) {
          // calculate height of slide based on contents
          this.children('div').children().each(function() {
            fitToContentHeight += $(this).outerHeight();
          });

          // assign content height to slide
          if (!transparent) {
            css.slide.height = fitToContentHeight + tab.h + offset;
            css.panel.height = fitToContentHeight;
          } else {

          }
        } else {
          // fixed height
          css.slide.height = slide.h + tab.h;
          if (!transparent) {
            css.panel.height = css.slide.height - tab.h - offset;
          } else {
            css.panel.height = css.slide.height;
          }
        }

        // panel positions
        if (!transparent) {
          css.panel.position = { top : tab.h, left : 0 };
        } else {
          css.panel.position = { top : 0, left : 0 };
        }

        css.slide.position = { top : index * tab.h, left : 0 };
        css.slide.width = css.tab.width = css.panel.width = '100%';

        // compensate for pre-selected slide
        if (selected.length) {
          if (index > slides.index(selected)) {
            if (fitToContent) {
              css.slide.position.top += selected.height() - tab.h;
            } else {
              css.slide.position.top += slide.h;
            }
          }
        }
      }

      return css;
    };

    setup.slidePositions = function() {
      var selected = slides.filter('.selected');

      // account for already selected slide if startClosed option not enabled
      if (!selected.length && !settings.startClosed) {
        slides.eq(settings.firstSlide - 1).addClass('selected');
        selected = slides.filter('.selected');
      }

      slides.each(function(index) {
        var $this = $(this),
            css = setup.getSlideCss.call($this, index, selected),
            h = $this.children('h2'),
            b = h.children('b');

        // set each slide position
        $this
          .width(css.slide.width)
          .height(css.slide.height)
          .css(css.slide.position)
          .attr('data-slide-name', elem[0].id + '-slide-' + (index + 1))
            .children('h2')
            .width(css.tab.width)
            .height(tab.h)
            .next()
              .width(css.panel.width)
              .height(css.panel.height)
              .css(css.panel.position);

        // add number to bottom of tab
        if (settings.showSlideNumbers) {
          if (b.length) return;
          h.append('<b>' + (index + 1) + '</b>');
        } else {
          // hide b if exists
          if (b.length) b.hide();
        }

        // compensate for <= ie8's lack of transform origin
/*
        if (elem.hasClass('ie8')) {
          if (elem.hasClass('horizontal') && elem.hasClass('rtl')) {
            $this.children('h2').css('marginRight', -(slide.h - tab.h));
          } else if (elem.hasClass('vertical')) {
            $this.children('h2').css('marginRight', 0);
          }
        }
*/
      });

      // fit to content on init
      if (fitToContent && !elem.hasClass('closed')) core.fitToContent(selected);
    };

    setup.startClosed = function() {
      // add closed class here rather than in setup.styles
      if (settings.startClosed) elem.addClass('closed');

      // start accordion in closed position
      if (orientation) {
        elem.css('width', (slide.l * tab.h) + (border / 2) + (padding * 2) - 1);
      } else {
        elem.css('height', slide.l * tab.h + border);
      }
    };

    setup.events = function() {
      var resizeTimer = 0;

      // bind click and mouseover events
      if (settings.activateOn === 'click') {
        // trigger animation cycle
        tabs.on('click.accordionPro touchstart.accordionPro', core.animationCycle);

        // fire start closed event once
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.startClosed);
      } else if (settings.activateOn === 'mouseover') {
        // trigger animation cycle
        tabs.on('click.accordionPro touchstart.accordionPro mouseover.accordionPro', core.animationCycle);

        // fire start closed event once
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed', core.startClosed);
      }

      // bind touch events (swipe)
      if (Modernizr.touch && settings.touchEnabled) {
        slides.swipe({
          left : function() {
            if (orientation) {
              if (settings.rtl) {
                // don't select previous slide if current slide is index zero
                if (core.currentSlide) methods.prev();
              } else {
                methods.next();
              }
            }
          },
          right : function() {
            if (orientation) {
              if (settings.rtl) {
                methods.next();
              } else {
                if (core.currentSlide) methods.prev();
              }
            }
          },
          up : function() {
            if (!orientation) methods.next();
          },
          down : function() {
            if (!orientation && core.currentSlide) methods.prev();
          },
          threshold: { x: 100, y: 100 }
        });
      }

      // pause on hover (can't use custom events with $.hover())
      if (settings.pauseOnHover && settings.autoPlay) {
        elem
          .on('mouseover.accordionPro', function() {
            core.playing && methods.stop();
          })
          .on('mouseout.accordionPro', function() {
            !core.playing && methods.play(core.currentSlide);
          });
      }

      // bind hashchange event
      if (settings.linkable) {
        $(window).on('load.accordionPro hashchange.accordionPro', function(e) {
          var url = slides.filter(function() {
            return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
          });

          // if slide name exists, trigger slide
          if (url.length) core.animationCycle.call(url.children('h2')[0], e);
        });
      }

      // bind resize events if responsive or fluid options set
      if (settings.orientation === 'horizontal' && settings.responsive) {
        // responsive layout (first run)
        core.responsive();

        // resize and orientationchange
        $(window).on('resize.accordionPro orientationchange.accordionPro', function() {
          // approximates 'onresizeend'
          clearTimeout(resizeTimer);

          resizeTimer = setTimeout(function() {
            // responsive layout
            core.responsive();
          }, 200);
        });
      }
    };

    setup.ie = function() {
      var ua = navigator.userAgent,
          index = ua.indexOf('MSIE');

      // not ie
      if (index < 0) return;

      // ie
      if (index !== -1) {
        ua = ua.slice(index + 5, index + 7);
        ua = +ua;

        // ie versions
        // ie 7 and below
        if (ua <= 7) methods.destroy();

        // ie 10+ doesn't need additional styles...
        if (ua >= 10) return;

        // ... but ie 8 does :(
        if (ua === 8) {
          slides.each(function(index) {
            $(this).addClass('slide-' + index);
          });
        }

        // add ie classes for css fallbacks
        elem.addClass('ie ie' + ua);
      }
    };

    /**
     * Core scale and animation methods
     */

    core.startClosed = function() {
      if (elem.hasClass('closed')) {
        // redeclare parent height and width values
        if (orientation) { // horizontal
          elem.css('width', settings.horizontalWidth);
/*
          elem
            .animate({
              width : 900
            }, settings.slideSpeed);
*/
        } else { // vertical
          elem
            .animate({
              height : fitToContent ? (slide.l - 1) * tab.h + border + slides.filter('.selected').height() : settings.verticalHeight
            }, settings.slideSpeed);

          // consideration of border not required with height (jQ box model calc bug?)
          // elem.height(fitToContent ? (slide.l - 1) * tab.h + slides.filter('.selected').height() : settings.verticalHeight);
        }

        // remove closed class
        elem.removeClass('closed');

        // unbind event
        tabs.off('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed');

        // trigger responsive reflow
        if (settings.orientation === 'horizontal' && settings.responsive) core.responsive();
      }
    };

    core.fitToContent = function(selected) {
      if (!elem.hasClass('closed')) {
        elem
          .animate({
            height : (slide.l - 1) * tab.h + border + selected.height()
          }, settings.slideSpeed);

        // consideration of border not required with height (jQ box model calc bug?)
        elem.height((slide.l - 1) * tab.h + selected.height());
      }
    };

    core.responsive = function() {
      // scale
      core.scale();

      // redeclare parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // reset slide positions
      setup.slidePositions();
    };

    core.scale = function() {
      var scale = Math.min(elem.parent().outerWidth(true) / settings.horizontalWidth), // linear scale
          max = 1;

      // limit scale to maximum
      if (scale > max) scale = max;

      // css3 scaling not supported in ie8
      if (!elem.hasClass('ie8')) {
        elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');

        if (orientation) { // horizontal?
          elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)));
        }
      } else {
        // elem.add(elem.children('ol')).add(slides).add(slides.children('div').children()).css(Modernizr.prefixed('filter'), "progid:DXImageTransform.Microsoft.Matrix(M11=" + scale + ",M12=0,M21=0,M22=" + scale + ",SizingMethod='auto expand')");
        // elem.css('zoom', scale);
        // elem.children('ol').add(slides).css('height', elem.height());
        // elem.css('zoom', scale);

        // alert(elem.height());
      }
    };

    // counter for autoPlay (zero index firstSlide on init)
    core.currentSlide = settings.firstSlide - 1;

    // previous slide
    core.previousSlide = core.currentSlide;

    // next slide index
    core.nextSlide = function(index) {
      var next = index + 1 || core.currentSlide + 1;

      // closure
      return function() {
        return next++ % slide.l;
      };
    };

    // interval counter
    core.playing = 0;

    // animation active flag
    core.animationFlag = false;

    // calculate position of individual slide
    core.getSlidePosition = function(index, pos) {
      var position = {};

      if (typeof pos === 'number') {
        // group of slides
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : pos + index * tab.h };
          } else {
            position = { left : pos + index * tab.h };
          }
        } else { // vertical
          position = { top : pos + index * tab.h};
        }
      } else {
        // single slide above mid point
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : slide.w + index * tab.h };
          } else {
            position = { left : slide.w + index * tab.h };
          }
        } else { // vertical
          // fixed height
          position = { top : slide.h + index * tab.h };
        }
      }

      return position;
    };

    // trigger animation cycle
    core.animationCycle = function(e) {
      var $this = $(this),
          active = {
            slide : $this.parent(),
            index : tabs.index($this)
          };

      // additional props of active slide
      active.next = active.slide.next();
      active.prev = active.slide.prev();

      // update hash
/*
      if (settings.linkable && active.slide.attr('data-slide-name')) {
        if (active.slide.attr('data-slide-name') !== window.location.hash.split('#')[1]) {
          // exit early and try again
          // !!! return window.location.hash = '#' + active.slide.attr('data-slide-name');
        }
      }
*/

      // update core.previousSlide, core.currentSlide
      core.previousSlide = core.currentSlide;
      core.currentSlide = active.index;

      // reset onSlideOpen callback flag
      core.animationFlag = false;

      // animate
      if (active.slide.hasClass('selected')) {
        // trigger callback in context of previous slide's panel <div>
        settings.onSlideOpen.call(active.prev.children('div')[0]);

        // animate single selected slide
        if (orientation) { // horizontal
          if ((settings.rtl && active.slide.position().left > parent.w / 2) || active.slide.position().left < parent.w / 2) {
            // animate single slide
            core.animateSlide.call(active);
          }
        } else { // vertical
          if (fitToContent && active.index) {
            // animate group (slide not index zero)
            core.animateGroup(active, true);

            // wrap height of accordion around slides
            core.fitToContent(active.prev);
          } else if (active.slide.position().top < parent.h / 2) {
            // animate single slide
            core.animateSlide.call(active);
          }
        }
      } else {
        // trigger callback in context of current slide's panel <div>
        // after delay of slideSpeed
        setTimeout(function() {
          settings.onSlideOpen.call(active.slide.children('div')[0]);
        }, settings.slideSpeed);

        // animate group of slides
        core.animateGroup(active);

        // wrap height of accordion around slides
        if (fitToContent) core.fitToContent(active.slide);
      }

      // stop autoplay, reset current slide index in core.nextSlide closure
      if (settings.autoPlay) {
        methods.stop();
        methods.play(tabs.index(slides.filter('.selected')));
      }
    };

    // animate single slide
    core.animateSlide = function(trigger) {
      var position;

      // set position for single selected tab
      if (typeof this.position === 'undefined') {
        this.position = core.getSlidePosition.call(this, this.index);
        // remove, then add selected class on single slide
        if (this.index) slides.removeClass('selected').filter(this.prev).addClass('selected');
      } else if (typeof this.position === 'number') { // group, or single tab below mid point
        position = this.position;
        this.position = core.getSlidePosition(this.index, position);
      }

      // if slide index not zero
      if (this.index) core.transition.call(this, trigger);
    };

    // animate group of slides
    core.animateGroup = function(trigger, single) {
      var group = ['left', 'right'];

      $.each(group, function(index, side) {
        var filterExpr, position;

        if (!index)  {
          // left side of expr (left or top position)
          if (single) {
            filterExpr = ':lt(' + (trigger.index) + ')';
          } else {
            filterExpr = ':lt(' + (trigger.index + 1) + ')';
          }
          position = 0;
        } else {
          // right side of expr (bottom or right position)
          if (single) {
            filterExpr = ':gt(' + (trigger.index - 1) + ')';
          } else {
            filterExpr = ':gt(' + trigger.index + ')';
          }

          if (orientation) { // horizontal
            position = slide.w;
          } else { // vertical
            if (fitToContent) {
              if (single) {
                position = trigger.prev.height() - tab.h;
              } else {
                // fit to content
                position = trigger.slide.height() - tab.h;
              }
            } else {
              // fixed height
              position = slide.h;
            }
          }
        }

        slides
          .filter(filterExpr)
          .each(function() {
            var $this = $(this),
                active = {
                  slide : $this,
                  index : slides.index($this),
                  next : $this.next(),
                  prev : $this.prev(),
                  position : position
                };

            // trigger item anim, pass original trigger context for callback fn
            core.animateSlide.call(active, trigger);
          });
      });

      // remove, then add selected class
      slides.removeClass('selected').filter(single ? trigger.prev : trigger.slide).addClass('selected');
    };

    // animate with css transitions, else fallback to jQuery animation
    core.transition = function(trigger) {
      var _this = this;

      // animate slide
      this
        .slide
        .stop(true)
        .animate(
          this.position,
          settings.slideSpeed,
          easing,
          function() {
            // flag ensures that fn is only called one time per triggerSlide
            if (!core.animationFlag) {
              // trigger slide callback
              settings.onSlideClose.call(slides.eq(core.previousSlide).children('div'));

              // set animation flag
              core.animationFlag = true;
            }
          });
    };

    core.init = function() {
      // check width and baseHeight are integers
      if (typeof settings.horizontalWidth !== 'number' || typeof settings.horizontalHeight !== 'number' || typeof settings.verticalHeight !== 'number') {
        throw new Error('horizontalWidth, horizontalHeight, and verticalHeight options must be integers.');
      }

      // FOUC prevention
      elem.hide();

      // ie test
      setup.ie();

      // setup dimensions, styles, slide positions and events
      setup.styles();

      // check images are loaded before setting up slide positions
      elem.imagesLoaded(function() {
        setup.dimensions();
        setup.slidePositions();
        setup.events();
        if (settings.startClosed || fitToContent) setup.startClosed();
        elem.show(); // images loaded -> set plugin to visible
      });

      // check slide speed is not faster than cycle speed
      if (settings.cycleSpeed < settings.slideSpeed) settings.cycleSpeed = settings.slideSpeed;

      // linkable and startClosed not compatible
      if (settings.linkable) settings.startClosed = false;

      // init autoplay
      if (settings.autoPlay) methods.play();
    };

    // init plugin
    core.init();

    // expose methods
    return methods;
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
        var accordionPro;

        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        accordionPro = new AccordionPro(elem, method);
        elem.data('accordionPro', accordionPro);
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // debug method isn't chainable b/c we need the debug object to be returned
      if (method === 'debug') {
        return instance[method].call(elem);
      } else { // the rest of the methods are chainable though
        instance[method].call(elem);
        return elem;
      }
    }
  };

})(jQuery);