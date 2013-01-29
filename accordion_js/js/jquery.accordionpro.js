/*************************************************!
*
*   project:    Accordion Pro - a responsive accordion plugin for jQuery
*   author:     Nicola Hibbert
*   url:        http://codecanyon.net/item/accordion-pro/1506395?ref=nicolahibbert
*   demo:       http://accordionpro.nicolahibbert.com/
*
*   Version:    1.0
*   Copyright:  (c) 2010-2013 Nicola Hibbert
*
**************************************************/

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
      orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
      startClosed : false,
      rtl : false,

      width : '100%',                         // fixed (px/em) or responsive (%)
      height : 320,                           // fixed (px)
      tabSize : 48,                           // fixed (px)

      activateOn : 'click',                   // click or mouseover
      firstSlide : 1,                         // displays slide (n) on page load
      slideSpeed : 800,                       // slide animation speed
      onSlideOpen : function(e) {},           // callback on slide activate
      onSlideClose : function(e) {},          // callback on slide anim complete

      autoPlay : false,                       // automatically cycle through slides
      pauseOnHover : false,                   // pause on hover
      cycleSpeed : 6000,                      // time between slide cycles
      easing : 'swing',                       // custom easing function

      theme : 'basic',                        // basic, dark, light, or stitch
      rounded : false,                        // square or rounded corners
      showSlideNumbers : true,                // put numbers on slides
      linkable : false                        // link slides via hash
    };

    /**
     * Merge defaults with options in new settings object
     */

    settings = $.extend({}, defaults, options);
    // settings.orientation = 'horizontal';
    // settings.rtl = false;

    /**
     * Delegate transition calls to animate if css3 animations not supported
     */

    if (!$.support.transition) $.fn.transition = $.fn.animate;

    /**
     * "Globals"
     */

    var parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : 0 },
        orientation = settings.orientation === 'horizontal' ? 1 : 0;

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
      core.playing = setInterval(function() {
        tab.eq(next()).trigger('click.accordionPro');
      }, settings.cycleSpeed);
    };

    // stop elem animation
    methods.stop = function() {
      clearInterval(core.playing);
      core.playing = 0;
    };

    // trigger next slide
    methods.next = function() {
      methods.stop();
      tab.eq(core.currentSlide === slide.length - 1 ? 0 : core.currentSlide + 1).trigger('click.accordionPro');
    };

    // trigger previous slide
    methods.prev = function() {
      methods.stop();
      tab.eq(core.currentSlide - 1).trigger('click.accordionPro');
    };

    // destroy plugin instance
    methods.destroy = function() {
      // stop autoplay
      methods.stop();

      // remove hashchange event bound to window
      $(window).off('.accordionPro');

      // remove generated styles, classes, data, events
      elem
        .attr('style', '')
        .removeClass('accordionPro horizontal vertical basic dark light stitch rounded rtl')
        .removeData('accordionPro')
        .off('.accordionPro')
        .find('li > :first-child')
        .off('.accordionPro')
        .filter('.selected')
        .removeClass('selected')
        .end()
        .find('b')
        .remove();

      slides
        .removeClass('slide')
        .children()
        .attr('style', '');
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
      var padding;

      // set parent theme and corner style
      elem
        .width(settings.width)
        .height(settings.height)
        .addClass('accordionPro ' + settings.orientation)
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl');

      // cache parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // cache slide length
      slide.l = slides.length;

      // set tab size on first tab elem to calculate px value
      tabs.eq(0).height(settings.tabSize);
      tab.h = tabs.eq(0).height();

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

      // add slide class to each slide
      slides.addClass('slide');
    };

    setup.getSlideCss = function(index, selected) {
      var panel = tabs.first().next(), offset,
          css = {
            slide : {},
            tab : {},
            panel : {}
          };

      if (orientation) {
        // calculate global slide dimensions
        slide.w = parent.w - slide.l * tab.h;
        slide.h = parent.h;

        // calculate slide offset
        offset = parseInt(panel.css('marginLeft'), 10) || parseInt(panel.css('marginRight'), 10) || 0;

        // calculate slide properties
        css.slide.width = slide.w + tab.h;
        css.slide.height = '100%';
        css.slide.position = { left : index * tab.h };

        // calculate tab properties
        css.tab.width = slide.h;

        // calculate content panel properties
        css.panel.width = slide.w - offset;
        css.panel.height = slide.h;
        css.panel.position = { left : tab.h };

        // adjust for rtl if necessary
        if (settings.rtl) {
          css.slide.position = { left : 'auto', right : index * tab.h };
          css.panel.position = { left : 'auto', right : tab.h - offset };
        }

        // compensate for pre-selected slide
        if (selected.length) {
          if (index > slides.index(selected)) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
        } else if (!settings.startClosed) {
          if (index >= settings.firstSlide) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
        }
      } else {
        // calculate global slide dimensions
        slide.w = tabs.eq(0).width; // px value
        slide.h = parent.h - slide.l * tab.h;

        // calculate slide properties
        css.slide.position = { top : index * tab.h };
        css.slide.height = slide.h + tab.h - (settings.theme === 'basic' ? 0 : (tab.h - tabs.eq(0).children().outerHeight()));
        css.slide.width = '100%';

        // calculate tab properties
        css.tab.width = '100%';

        // calculate panel properties
        css.panel.width = '100%';
        css.panel.height = css.slide.height - tab.h;
        css.panel.position = { top : tab.h };

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
      });
    };

    setup.events = function() {
      var resizeTimer = 0;

      // bind click and mouseover events
      if (settings.activateOn === 'click') {
        tabs.on('click.accordionPro', core.animate);
      } else if (settings.activateOn === 'mouseover') {
        tabs.on('click.accordionPro mouseover.accordionPro', core.animate);
      }

/*
      // bind hashchange event
      if (settings.linkable) {
        $(window).on('hashchange.accordionPro', function(e) {
          var url = slides.filter(function() {
            return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
          });

          // if slide name exists
          if (url.length) {
            // trigger slide
            core.triggerSlide.call(url.children('h2')[0], e);
          }
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
*/

      // resize and orientationchange
      $(window).on('resize.accordionPro orientationchange.accordionPro', function() {
        // approximates 'onresizeend'
        if (orientation) {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            // redeclare parent height and width values
            parent.w = elem.width();
            parent.h = elem.height();

            // reset slide positions
            setup.slidePositions();
          }, 100);
        }
      });
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
        if (ua < 7) methods.destroy();
        if (ua >= 10) return;
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
     * Internal animation methods
     */

    // counter for autoPlay (zero index firstSlide on init)
    core.currentSlide = settings.firstSlide - 1;

    // next slide index
    core.nextSlide = function(index) {
      var next = index + 1 || core.currentSlide + 1;

      // closure
      return function() {
        return next++ % slide.length;
      };
    };

    // interval counter
    core.playing = 0;

    // animation active flag
    core.animationFlag = false;

    // trigger animation cycle
    core.animate = function() {
      var $this = $(this),
          active = {
            tab : $this,
            slide : $this.parent(),
            index : tabs.index($this)
          };

      // additional props of active slide
      active.next = active.slide.next();
      active.prev = active.slide.prev();

/*
      // current hash not correct?
      if (settings.linkable && tab.parent.attr('data-slide-name')) {
        if (tab.parent.attr('data-slide-name') !== window.location.hash.split('#')[1]) {
          // exit early and try again
          return window.location.hash = '#' + tab.parent.attr('data-slide-name');
        }
      }
*/

      // update core.currentSlide
      core.currentSlide = active.index;

      // reset onSlideAnimComplete callback flag
      core.animationFlag = false;

      // trigger callback in context of next slide (jQuery wrapped)
      // settings.onSlideOpen.call(active.next, $this.children('div'));

      // animate
      if (active.slide.hasClass('selected')) {
        // animate single selected slide
        if (orientation) { // horizontal
          if ((settings.rtl && active.slide.position().left > parent.w / 2) || active.slide.position().left < parent.w / 2) {
            core.animateSlide.call(active);
          }
        } else { // vertical
          if (active.slide.position().top < parent.h / 2) {
            core.animateSlide.call(active);
          }
        }
      } else {
        // animate group of slide
        core.animateGroup(active);
      }

/*
      // stop autoplay, reset current slide index in core.nextSlide closure
      if (settings.autoPlay) {
        methods.stop();
        methods.play(tab.index(tab.filter('.selected')));
      }
*/
    };

    core.getSlidePosition = function(index, group) {
      var position = {};

      if (group) {
        switch (group) {
          case 'top':
            position = { top : index * tab.h };
            break;
          case 'bottom':
            position = { top : slide.h + index * tab.h };
            break;
          case 'right':
            if (settings.rtl) {
              position = { right : slide.w + index * tab.h };
            } else {
              position = { left : slide.w + index * tab.h };
            }
            break;
          case 'left':
          default:
            if (settings.rtl) {
              position = { right : index * tab.h };
            } else {
              position = { left : index * tab.h };
            }
            break;
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

    // animate single slide
    core.animateSlide = function(trigger) {
      var _this = this;

      // set position for single selected tab
      if (typeof this.position === 'undefined') {
        this.position = core.getSlidePosition(this.index);
      }

      // remove, then add selected class
      slides.removeClass('selected').filter(this.slide).addClass('selected');

      // if slide index not zero
      if (!!this.index) {
        this
          .slide
          .stop(true)
          .animate(
            this.position,
            settings.slideSpeed,
            // settings.easing,
            function() {
              // flag ensures that fn is only called one time per triggerSlide
              if (!core.animationFlag) {
                // trigger callback in context of sibling div (jQuery wrapped)
                // settings.onSlideClose.call(trigger ? trigger.next : _this.prev.next());
                core.animationFlag = true;
              }
            });

        // remove, then add selected class
        slides.removeClass('selected').filter(_this.prev).addClass('selected');
      }
    };

    // animate group of slides
    core.animateGroup = function(trigger) {
      var group = orientation ? ['left', 'right'] : ['top', 'bottom'];

      $.each(group, function(index, side) {
        var filterExpr, position;

        if (!index)  {
          // left side
          filterExpr = ':lt(' + (trigger.index + 1) + ')';
        } else {
          // right side
          filterExpr = ':gt(' + trigger.index + ')';
        }

        slides
          .filter(filterExpr)
          .each(function() {
            var $this = $(this),
                active = {
                  tab : $this.children('h2'),
                  slide : $this,
                  next : $this.next(),
                  prev : $this.prev(),
                  index : slides.index($this)
                };
                active.position = core.getSlidePosition(active.index, group[index]);

            // trigger item anim, pass original trigger context for callback fn
            core.animateSlide.call(active, trigger);
          });
      });

      // remove, then add selected class
      slides.removeClass('selected').filter(trigger.slide).addClass('selected');
    };

    core.init = function() {
      setup.ie();
      setup.styles();
      setup.slidePositions();
      setup.events();
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