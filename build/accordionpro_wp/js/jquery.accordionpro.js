/**
 * @name jQuery Swipe plugin (https://github.com/jgarber623/jquery-swipe)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */
(function(c,b,a,e){var d=function(g,f){this.elem=g;this.$elem=c(g);this.options=f;this.metadata=this.$elem.data("swipe-options")};d.prototype={defaults:{left:function(f){},right:function(f){},up:function(f){},down:function(f){},threshold:{x:100,y:50}},init:function(){this.config=c.extend({},this.defaults,this.options,this.metadata);this.coords={start:{x:0,y:0},end:{x:0,y:0}};c(this.elem).on({touchstart:c.proxy(this.touchStart,this),touchmove:c.proxy(this.touchMove,this),touchend:c.proxy(this.touchEnd,this)});return this},touchEnd:function(f){var g={x:this.coords.start.x-this.coords.end.x,y:this.coords.start.y-this.coords.end.y};if(g.y<this.config.threshold.y&&g.y>(this.config.threshold.y*-1)){if(g.x>this.config.threshold.x){this.config.left()}if(g.x<(this.config.threshold.x*-1)){this.config.right()}}else{if(g.y>=0){this.config.up()}else{this.config.down()}}},touchMove:function(f){f.preventDefault();var g=f.originalEvent.targetTouches[0];this.coords.end={x:g.pageX,y:g.pageY}},touchStart:function(f){var g=f.originalEvent.targetTouches[0];this.coords={start:{x:g.pageX,y:g.pageY},end:{x:g.pageX,y:g.pageY}}}};d.defaults=d.prototype.defaults;c.fn.swipe=function(f){return this.each(function(){new d(this,f).init()})}})(jQuery,window,document);

/*
 * Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransitions=function(){return E("transition")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e.prefixed=function(a,b,c){return b?E(a,b,c):E(a,"pfx")},e}(this,this.document);

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

/*!
 * jQuery imagesLoaded plugin v2.1.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);

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

      /* horizontal accordion options */
      horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
      horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value
      responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
      minResponsiveWidth : 400,               // horizontal accordion will flip to vertical at (and below) this width
      maxResponsiveWidth : 1020,              // accordion will not scale up beyond this width

      /* vertical accordion options */
      verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
      verticalHeight : 400,                   // base vertical accordion height; fixed (px [integer])
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
        offset = 0,
        border = 0,
        orientation = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing,
        fitToContent = !orientation && settings.verticalSlideHeight === 'fitToContent' ? true : false;

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
        .outerWidth(orientation ? settings.horizontalWidth : settings.verticalWidth)
        .outerHeight(orientation ? settings.horizontalHeight : settings.verticalHeight)
        .addClass('accordionPro')
        .addClass(orientation ? 'horizontal' : 'vertical')
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl');

      console.log(elem.width(), elem.children('ol').width());

      // add slide class to each slide
      slides.addClass('slide');
    };

    setup.dimensions = function() {
      // cache parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // cache slide length
      slide.l = slides.length;

      // calculate padding
      if (orientation) {
        padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10) + parseInt(elem.css('borderLeft'), 10) + parseInt(elem.css('borderRight'), 10);
      } else {
        padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10) + parseInt(elem.css('borderTop'), 10) + parseInt(elem.css('borderBottom'), 10);
      }
    };

    setup.getSlideCss = function(index, selected) {
      var firstPanel = slides.eq(0).children('div'),
          fitToContentHeight = 0,
          css = {
            slide : {},
            tab : {},
            panel : {}
          };

      // calculate slide offset
      offset =
        parseInt(firstPanel.css('marginLeft'), 10) ||
        parseInt(firstPanel.css('marginRight'), 10) ||
        parseInt(firstPanel.css('marginBottom'), 10) || 0;

      // calculate slide border
      border = elem.outerHeight() - elem.height();

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
        css.panel.width = slide.w - offset;
        css.panel.height = slide.h;
        css.panel.position = { left : tab.h, top : 0 };

        // adjust for rtl if necessary
        if (settings.rtl) {
          css.slide.position = { left : 'auto', right : index * tab.h, top : 0 };
          css.panel.position = { left : 'auto', right : tab.h - offset, top : 0 };
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
          css.slide.height = fitToContentHeight + tab.h + offset;
          css.panel.height = fitToContentHeight;
        } else {
          // fixed height
          css.slide.height = slide.h + tab.h;
          css.panel.height = css.slide.height - tab.h - offset;
        }

        css.panel.position = { top : tab.h, left : 0 };
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
        elem.width(slide.l * tab.h);
        if (settings.responsive && elem.parent().outerWidth(true) > settings.minResponsiveWidth) core.scale();
      } else {
        elem.height(slide.l * tab.h);
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

      // only bind resize events if responsive or fluid options set
      if (settings.orientation === 'horizontal' && settings.responsive) {
        // resize and orientationchange
        $(window).on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
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
      var w = elem.parent().outerWidth(true); // responsive reaction to parent element width, not window width

      // not responsive until first slide opened
      if (elem.hasClass('closed')) return;

      // respond to layout changes
      if (orientation) { // horizontal
        // flip to vertical
        if (w <= settings.minResponsiveWidth) {
          // change orientation
          orientation = 0;

          // remove horizontal class and any scaling
          if (!elem.hasClass('ie8')) {
            elem.removeClass('horizontal').addClass('responsive').css(Modernizr.prefixed('transform'), '');
          } else {
            elem.removeClass('horizontal').addClass('responsive');
            // elem.add(elem.children('ol')).add(slides).add(slides.children('div').children()).css(Modernizr.prefixed('filter'), '');
            elem.css('zoom', '');
          }

          // reinit styles
          setup.styles();

          // change height
          elem.height(slide.l * tab.h + slide.h);
        } else {
          // scale
          core.scale();
        }
      } else { // vertical
        // flip back to horizontal
        if (w > settings.minResponsiveWidth && elem.hasClass('responsive')) {
          // flip back to horizontal accordion
          orientation = 1;
          elem.removeClass('vertical responsive');

          // reinit styles
          setup.styles();

          // scale
          core.scale();
        }
      }

      // redeclare parent height and width values
      parent.w = elem.width();
      parent.h = elem.height();

      // reset slide positions
      setup.slidePositions();
    };

    core.scale = function() {
      var scale = Math.min(elem.parent().outerWidth(true) / settings.horizontalWidth), // linear scale
          max = Math.min(settings.maxResponsiveWidth / settings.horizontalWidth);

      // limit scale to maximum
      if (scale > max) scale = max;

      // css3 scaling not supported in ie8
      if (!elem.hasClass('ie8')) {
        elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');
      } else {
        // elem.add(elem.children('ol')).add(slides).add(slides.children('div').children()).css(Modernizr.prefixed('filter'), "progid:DXImageTransform.Microsoft.Matrix(M11=" + scale + ",M12=0,M21=0,M22=" + scale + ",SizingMethod='auto expand')");
        elem.css('zoom', scale);
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

      // ie test
      setup.ie();

      // setup dimensions, styles, slide positions and events
      setup.styles();

      // check images are loaded before setting up slide positions
      elem.imagesLoaded(function() {
        setup.dimensions();
        if (settings.startClosed || fitToContent) setup.startClosed();
        setup.slidePositions();
        setup.events();
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

