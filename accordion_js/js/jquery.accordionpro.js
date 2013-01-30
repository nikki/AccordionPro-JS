/**
 * @name jQuery Swipe plugin (https://github.com/jgarber623/jquery-swipe)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

(function(c,b,a,e){var d=function(g,f){this.elem=g;this.$elem=c(g);this.options=f;this.metadata=this.$elem.data("swipe-options")};d.prototype={defaults:{left:function(f){},right:function(f){},up:function(f){},down:function(f){},threshold:{x:100,y:50}},init:function(){this.config=c.extend({},this.defaults,this.options,this.metadata);this.coords={start:{x:0,y:0},end:{x:0,y:0}};c(this.elem).on({touchstart:c.proxy(this.touchStart,this),touchmove:c.proxy(this.touchMove,this),touchend:c.proxy(this.touchEnd,this)});return this},touchEnd:function(f){var g={x:this.coords.start.x-this.coords.end.x,y:this.coords.start.y-this.coords.end.y};if(g.y<this.config.threshold.y&&g.y>(this.config.threshold.y*-1)){if(g.x>this.config.threshold.x){this.config.left()}if(g.x<(this.config.threshold.x*-1)){this.config.right()}}else{if(g.y>=0){this.config.up()}else{this.config.down()}}},touchMove:function(f){f.preventDefault();var g=f.originalEvent.targetTouches[0];this.coords.end={x:g.pageX,y:g.pageY}},touchStart:function(f){var g=f.originalEvent.targetTouches[0];this.coords={start:{x:g.pageX,y:g.pageY},end:{x:g.pageX,y:g.pageY}}}};d.defaults=d.prototype.defaults;c.fn.swipe=function(f){return this.each(function(){new d(this,f).init()})}})(jQuery,window,document);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */

;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransitions=function(){return E("transition")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e.prefixed=function(a,b,c){return b?E(a,b,c):E(a,"pfx")},e}(this,this.document);

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
      startClosed : false,                    // start in a closed position
      rtl : false,                            // right to left layout

      width : '100%',                         // fixed (px/em) or fluid (%)
      height : 320,                           // fixed (px)
      tabSize : 48,                           // fixed (px)

      activateOn : 'click',                   // click or mouseover (tap and swipe touch events enabled by default)
      firstSlide : 1,                         // displays slide (n) on page load
      slideSpeed : 800,                       // slide animation speed
      onSlideOpen : function() {},            // callback on slide open
      onSlideClose : function() {},           // callback on slide animation complete

      autoPlay : false,                       // automatically cycle through slides
      pauseOnHover : false,                   // pause on hover
      cycleSpeed : 6000,                      // time between slide cycles
      easing : 'ease-in-out',                 // animation easing

      theme : 'basic',                        // basic, dark, light, or stitch
      rounded : false,                        // square or rounded corners
      showSlideNumbers : true,                // put numbers on slides
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
        tab = { w : 0, h : 0 },
        orientation = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing;

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
        tabs.eq(next()).trigger('click.accordionPro');
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
        .removeClass('accordionPro horizontal vertical basic dark light stitch rounded rtl closed')
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
      var padding;

      // set parent theme and corner style
      elem
        .width(settings.width)
        .height(settings.height)
        .addClass('accordionPro ' + settings.orientation)
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl')
        .addClass(settings.startClosed && 'closed');

      // cache parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // cache slide length
      slide.l = slides.length;

      // add slide class to each slide
      slides.addClass('slide');

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
      } else { // vertical
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
      });
    };

    setup.startClosed = function() {
      if (elem.hasClass('closed')) {
        // redeclare parent height and width values
        elem.css('width', settings.width); // needs to be css width for % rather than px value
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
        $(window).on('hashchange.accordionPro', function(e) {
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
     * Core animation methods
     */

    // counter for autoPlay (zero index firstSlide on init)
    core.currentSlide = settings.firstSlide - 1;

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
              // trigger callback in context of sibling div (jQuery wrapped)
              // settings.onSlideClose.call(trigger ? trigger.next.children('div') : _this.prev.next().children('div'));

              core.animationFlag = true;
            }
          });
    };

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
                  tab : $this.children('h2'),
                  slide : $this,
                  next : $this.next(),
                  prev : $this.prev(),
                  index : slides.index($this),
                  position : position
                };

            // trigger item anim, pass original trigger context for callback fn
            core.animateSlide.call(active, trigger);
          });
      });

      // remove, then add selected class
      slides.removeClass('selected').filter(trigger.slide).addClass('selected');
    };

    // trigger animation cycle
    core.animationCycle = function() {
      var $this = $(this),
          active = {
            tab : $this,
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

      // update core.currentSlide
      core.currentSlide = active.index;

      // reset onSlideAnimComplete callback flag
      core.animationFlag = false;

      // trigger callback in context of next slide (jQuery wrapped)
      settings.onSlideOpen.call($this.next());

//      // animate
//      if (active.slide.hasClass('selected')) {
//        // animate single selected slide
//        if (orientation) { // horizontal
//          // console.log(active.slide.position().left);
//          if ((settings.rtl && active.slide.position().left > parent.w / 2) || active.slide.position().left < parent.w / 2) {
//            core.animateSlide.call(active);
//          }
//        } else { // vertical
//          if (active.slide.position().top < parent.h / 2) {
//            core.animateSlide.call(active);
//          }
//        }
//      } else {
//        // animate group of slides
        core.animateGroup(active);
//      }

      // stop autoplay, reset current slide index in core.nextSlide closure
      if (settings.autoPlay) {
        methods.stop();
        methods.play(tabs.index(slides.filter('.selected')));
      }
    };

    core.init = function() {
      // ie test
      setup.ie();

      // setup styles, slide positions and events
      setup.styles();
      setup.slidePositions();
      setup.events();

      // check slide speed is not faster than cycle speed
      if (settings.cycleSpeed < settings.slideSpeed) settings.cycleSpeed = settings.slideSpeed;

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