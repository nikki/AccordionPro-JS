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
      theme : 'basic',                        // basic, dark, light, or stitch
      rounded : false,                        // square or rounded corners
      rtl : false,                            // right to left layout
      showSlideNumbers : true,                // display numbers on slides

      /* dimensions */
      baseWidth : 900,                        // base width; fixed (px) - responsive scaling is relative to this value
      baseHeight : 360,                       // base height; fixed (px) - responsive scaling is relative to this value
      // tabSize : 48,                        // fixed (px) !!! REMOVED

      /* responsive */
      responsive : true,                      // accordion will adapt itself to the page layout (overrides fluid by default)
      minResponsiveWidth : 768,               // accordion will hide tabs (and below) this width (set to 0 to disable)
      maxResponsiveWidth : 1200,              // accordion will not scale up beyond this width

      /* events */
      activateOn : 'click',                   // click or mouseover (tap and swipe touch events enabled by default)
      onSlideOpen : function() {},            // callback on slide open
      onSlideClose : function() {},           // callback on slide animation complete

      /* animations */
      autoPlay : false,                       // automatically cycle through slides
      cycleSpeed : 6000,                      // time between slide cycles
      slideSpeed : 800,                       // slide animation speed
      easing : 'ease-in-out',                 // animation easing

      /* miscellaneous */
      pauseOnHover : false,                   // pause on hover
      linkable : false                        // link slides via hash
    };

    /**
     * Merge defaults with options in new settings object
     */

    settings = $.extend({}, defaults, options);
    settings.orientation = 'horizontal';

    /**
     * "Globals"
     */

    var parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : 0 },
        orientation = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing,
        tabSize = 48;

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
        .removeClass('accordionPro horizontal vertical basic dark light stitch rounded rtl closed responsive')
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
      var padding = 0;

      // set parent theme and corner style
      elem
        .width(settings.baseWidth)
        .height(settings.baseHeight)
        .addClass('accordionPro')
        .addClass(settings.responsive && 'responsive')
        .addClass(orientation ? 'horizontal' : 'vertical')
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl')
        .addClass(settings.startClosed && 'closed');

      // add slide class to each slide
      slides.addClass('slide');
    };

    setup.dimensions = function() {
      // cache parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // cache slide length
      slide.l = slides.length;

      // set tab size on first tab elem to calculate px value
      tabs.eq(0).height(tabSize);
      // tab.h = tabs.eq(0).height();
      tab.h = tabSize; // !!! temp fix for ie8, px value only for now

      // calculate padding
      if (orientation) {
        padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10) + parseInt(elem.css('borderLeft'), 10) + parseInt(elem.css('borderRight'), 10);
      } else {
        padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10) + parseInt(elem.css('borderTop'), 10) + parseInt(elem.css('borderBottom'), 10);
      }

      // reset elem dimensions if start closed setting enabled
      if (settings.startClosed) {
        if (orientation) {
          elem.width(slide.l * tab.h + padding);
        } else {
          elem.height(slide.l * tab.h + padding);
        }
      }
    };

    setup.getSlideCss = function(index, selected) {
      var panel = tabs.first().next(), offset,
          css = {
            slide : {},
            tab : {},
            panel : {}
          };

      if (orientation) { // horizontal
        // calculate global slide dimensions
        slide.w = parent.w - slide.l * tab.h;
        slide.h = parent.h;

        // calculate slide offset
        offset = parseInt(panel.css('marginLeft'), 10) || parseInt(panel.css('marginRight'), 10) || 0;

        // calculate slide properties
        css.slide.width = slide.w + tab.h;
        css.slide.height = '100%';
        css.slide.position = { left : index * tab.h, top : 0 };

        // calculate tab properties
        css.tab.width = slide.h;

        // calculate content panel properties
        css.panel.width = slide.w - offset;
        css.panel.height = slide.h;
        css.panel.position = { left : tab.h, top : 0 };

        // adjust for rtl if necessary
        if (settings.rtl) {
          css.slide.position = { left : 'auto', right : index * tab.h, top : 0 };
          css.panel.position = { left : 'auto', right : tab.h - offset, top : 0 };
        }

        // compensate for pre-selected slide
        if (selected.length) {
          if (index > slides.index(selected)) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
        } else if (!settings.startClosed) {
          if (index >= settings.firstSlide) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
        }
      } else { // vertical
        // calculate global slide dimensions
        slide.w = tabs.eq(0).width(); // px value
        slide.h = parent.h - slide.l * tab.h;

        // calculate slide properties
        css.slide.position = { top : index * tab.h, left : 0 };
        css.slide.height = slide.h + tab.h - (settings.theme === 'basic' ? 0 : (tab.h - tabs.eq(0).children().outerHeight()));
        css.slide.width = '100%';

        // calculate tab properties
        css.tab.width = '100%';

        // calculate panel properties
        css.panel.width = '100%';
        css.panel.height = css.slide.height - tab.h;
        css.panel.position = { top : tab.h, left : 0 };

        // compensate for pre-selected slide
        if (selected.length) {
          if (index > slides.index(selected)) css.slide.position.top += slide.h;
        } else if (!settings.startClosed) {
          if (index >= settings.firstSlide) css.slide.position.top += slide.h;
        }
      }

      return css;
    };

    setup.slidePositions = function() {
      var selected = slides.filter('.selected');

      // account for already selected slide
      if (!selected.length && !settings.startClosed) slides.eq(settings.firstSlide - 1).addClass('selected');

      slides.each(function(index) {
        var $this = $(this),
            css = setup.getSlideCss.call($this, index, selected);

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
          if ($this.children('h2').children('b').length) return;
          $this.children('h2').append('<b>' + (index + 1) + '</b>');
        }

        // compensate for <= ie8's lack of transform origin
        if (!elem.hasClass('ie8')) return;

        if (elem.hasClass('horizontal') && elem.hasClass('rtl')) {
          $this.children('h2').css('marginRight', -(slide.h - tab.h));
        } else if (elem.hasClass('vertical')) {
          $this.children('h2').css('marginRight', 0);
        }
      });
    };

    setup.startClosed = function() {
      if (elem.hasClass('closed')) {
        // redeclare parent height and width values
        elem.css('width', settings.baseWidth); // needs to be css width for % rather than px value
        elem.height(parent.h);

        // remove closed class
        elem.removeClass('closed');

        // unbind event
        tabs.off('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed');
      }
    };

    setup.events = function() {
      var resizeTimer = 0;

      // bind click and mouseover events
      if (settings.activateOn === 'click') {
        tabs.on('click.accordionPro touchstart.accordionPro', core.animationCycle);
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', setup.startClosed);
      } else if (settings.activateOn === 'mouseover') {
        tabs.on('click.accordionPro touchstart.accordionPro mouseover.accordionPro', core.animationCycle);
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed', setup.startClosed);
      }

      // bind touch events (swipe)
      if (Modernizr.touch) {
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

          // if slide name exists
          if (url.length) {
            // trigger slide
            core.animationCycle.call(url.children('h2')[0], e);
          }
        });
      }

      // only bind resize events if responsive or fluid options set
      if (settings.responsive) {
        // resize and orientationchange
        $(window).on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
          // approximates 'onresizeend'
          clearTimeout(resizeTimer);

          // resize
          resizeTimer = setTimeout(function() {
            // responsive layout
            core.responsive();
          }, 100);
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
        // ie 6 and below
        if (ua < 7) methods.destroy();

        // kill linkable for ie7
        if (ua === 7) settings.linkable = false;

        // ie 10+ doesn't need additional styles...
        if (ua >= 10) return;

        // ... but ie 7 and do :(
        if (ua === 7 || ua === 8) {
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

    core.responsive = function() {
      var w = $(window).width();

      // slider
      if (w <= settings.minResponsiveWidth) {
        // change orientation
        orientation = 0;

        // remove horizontal class and any scaling
        elem.removeClass('horizontal').css(Modernizr.prefixed('transform'), '');

        // reinit styles
        setup.styles();

        // change height
        elem.height(slide.l * tabSize + slide.h);

        // redeclare parent height and width values
        parent.w = elem.width();
        parent.h = elem.height();

        // reset slide positions
        setup.slidePositions();

        // bind click event to slides
        // slides.on('click.accordionPro touchstart.accordionPro', core.animationCycle);

        // change slide and panel widths
        // slides.width('100%').children('div').width('100%');
      }

      // remove slider
      if (w > settings.minResponsiveWidth && elem.hasClass('minWidth')) {
        // remove click event from slides
        slides.off('click.accordionPro touchstart.accordionPro', core.animationCycle);

        // refresh slide positions
        // setup.slidePositions();
      }

      // scale
      if (w > settings.minResponsiveWidth && w <= settings.maxResponsiveWidth) core.scale();
    };

    core.scale = function() {
      var scale = Math.min(elem.parent().width() / settings.baseWidth); // linear scale

      // scale
      elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');
    };

/*
    core.fluid = function() {
      var w = $(window).width();

      if (orientation) { // horizontal
        // window size under min width?
        if (w <= settings.minFluidWidth) {
          // change orientation
          orientation = 0;
          elem.removeClass('horizontal');

          // reinit styles
          setup.styles();

          // change height
          elem.height(slide.l * tabSize + slide.h);
        }
      } else { // vertical
        if (settings.orientation === 'horizontal' && w > settings.minFluidWidth) {
          // flip back to horizontal accordion
          orientation = 1;
          elem.removeClass('vertical');

          // reinit styles
          setup.styles();
        }
      }

      // redeclare parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // reset slide positions
      setup.slidePositions();
    };
*/

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
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : pos + index * tab.h };
          } else {
            position = { left : pos + index * tab.h };
          }
        } else { // vertical
          position = { top : pos + index * tab.h };
        }
      } else {
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : slide.w + index * tab.h };
          } else {
            position = { left : slide.w + index * tab.h };
          }
        } else { // vertical
          position = { top : slide.h + index * tab.h };
        }
      }

      return position;
    };

    // trigger animation cycle
    core.animationCycle = function(e) {
      var $this = $(this), active = {};

      // double check where event originated from
      if (e.target.nodeName !== 'H2') {
        $this = $(e.target).closest('.slide').children('h2');
      }

      // !!!

      // determine active slide
      active = {
        slide : $this.parent(),
        index : tabs.index($this)
      };

      // additional props of active slide
      active.next = active.slide.next();
      active.prev = active.slide.prev();

      // update hash
      if (settings.linkable && active.slide.attr('data-slide-name')) {
        if (active.slide.attr('data-slide-name') !== window.location.hash.split('#')[1]) {
          // exit early and try again
          return window.location.hash = '#' + active.slide.attr('data-slide-name');
        }
      }

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
          if (active.slide.position().top < parent.h / 2) {
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
      }

      // stop autoplay, reset current slide index in core.nextSlide closure
      if (settings.autoPlay && !settings.linkable) {
        methods.stop();
        methods.play(tabs.index(slides.filter('.selected')));
      }
    };

    // animate single slide
    core.animateSlide = function(trigger) {
      var position;

      // set position for single selected tab
      if (typeof this.position === 'undefined') {
        this.position = core.getSlidePosition(this.index);
      } else if (typeof this.position === 'number') {
        position = this.position;
        this.position = core.getSlidePosition(this.index, position);
      }

      // remove, then add selected class
      slides.removeClass('selected').filter(this.slide).addClass('selected');

      // if slide index not zero
      if (!!this.index) {
        core.transition.call(this, trigger);

        // remove, then add selected class
        slides.removeClass('selected').filter(this.prev).addClass('selected');
      }
    };

    // animate group of slides
    core.animateGroup = function(trigger) {
      var group = ['left', 'right'];

      $.each(group, function(index, side) {
        var filterExpr, position;

        if (!index)  {
          // left side
          filterExpr = ':lt(' + (trigger.index + 1) + ')';
          position = 0;
        } else {
          // right side
          filterExpr = ':gt(' + trigger.index + ')';
          position = orientation ? slide.w : slide.h;
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
      slides.removeClass('selected').filter(trigger.slide).addClass('selected');
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
      // check baseWidth and baseHeight are integers
      if (typeof settings.baseWidth !== 'number' || typeof settings.baseHeight !== 'number') {
        throw new Error('baseWidth and baseHeight settings must be numbers.');
      }

      // ie test
      setup.ie();

      // setup dimensions, styles, slide positions and events
      setup.styles();
      setup.dimensions();
      setup.slidePositions();
      setup.events();

      // check slide speed is not faster than cycle speed
      if (settings.cycleSpeed < settings.slideSpeed) settings.cycleSpeed = settings.slideSpeed;

      // init autoplay (autoplay & linkable are not compatible with one another for UX reasons)
      if (settings.autoPlay && !settings.linkable) methods.play();
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