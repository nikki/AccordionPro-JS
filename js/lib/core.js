    /**
     * PLUGIN CORE
     */

    var core = {
      // interval counter
      timer : 0,

      // animation flag
      isPlaying : false,

      // counter for autoPlay
      currentSlide : settings.tab.selected - 1,

      // previous slide
      previousSlide : null,

      // next slide index
      nextSlide : function() {
        core.currentSlide++;
        return core.currentSlide % slide.l;
      },


      /**
       *
       */

      fitToContent : function() {

      },


      /**
       * Animate single slide
       */

      // !!! need to pass fitToContent height in
      animateSlide : function(props) {
        // don't animate first slide
        if (typeof props.index === 'number' && !props.index) return;

        // set animate position for single selected slide
        if (props.selected) {
          props[props.position] = (props.index * tab.h) + (props.side ? 0 : slide[horizontal ? 'w' : 'h']);
        }

        // animate slide
        this
          .stop(true)
          .animate(
            props,
            settings.slideSpeed,
            function() {
              // set selected slide if single
              if (props.selected) {
                core.setSelectedSlide.call(slides.eq(props.index - 1 ));
              }
            }
          )
      },


      /**
       * Animate group of slides
       */

      animateSlides : function(props) {
        var index = props.index,
            position = props.position,
            side = props.side,
            expr = '';

        // build expression
        expr += side ? ':lt(' : ':gt(';
        expr += side ? index + 1 : index;
        expr += ')';

        // animate slides
        slides
          .filter(expr)
          .each(function() {
            var $this = $(this),
                index = slides.index($this),
                props = {};

            // side 0 = left/top, side 1 = bottom/right
            props[position] = (index * tab.h) + (side ? 0 : slide[horizontal ? 'w' : 'h']);

            // animate single slide
            core.animateSlide.call($this, props);
          });

        // set selected slide
        core.setSelectedSlide.call(this);
      },


      /**
       * Trigger slide animation
       */

      trigger : function(e) {
        var $slide = $(this).parent(),
            props = {
              index : slides.index($slide),
              position : horizontal ? (settings.rtl ? 'right' : 'left') : 'top',
              selected : $slide.hasClass('selected')
            };

        // side 0 = left/top, side 1 = bottom/right (flipped for rtl)
        props.side = parseInt($slide.css(props.position), 10) > props.index * tab.h;

        // animate single (currently selected) slide, or animate a group of slides
        core['animateSlide' + (props.selected ? '' : 's')].call($slide, props);
      },


      /**
       * Set currently selected slide class, update core.currentSlide
       */

      setSelectedSlide : function() {
        // remove selected class
        slides.removeClass('selected');

        // add selected class to selected slide
        this.addClass('selected');

        // update currentSlide ref
        core.currentSlide = slides.index(this);
      },


      /**
       * Should this be here? Not setup + event?
       */

      triggerFromClosed : function() {
        // start closed
      },


      /**
       * Trigger slide animation from a link
       */

      triggerLink : function(e) {
        var slide = slides.filter(function() {
          return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
        });

        // if slide name exists, trigger slide
        if (slide) methods.trigger(slides.index(slide));
      },

      triggerDirection : function(dir) {
        console.log(dir);

/*

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
          threshold: { x: 80, y: 80 }
        });
 */

      },

      scalePlugin : function() {
        // var scale = Math.min(elem.parent().outerWidth(true) / settings.horizontalWidth); // linear scale
        // var ieOl;

        // // limit max scale to 1
        // // scale = ().toFixed(2);
        // scale = Math.min(scale, 1);

        // // css3 scaling not supported in ie8
        // if (!elem.hasClass('ie8')) {
        //   elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');

        //   if (orientation) { // horizontal?
        //     elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
        //   }
        // } else {
        //   elem.css('zoom', scale);
        // }
      },

      init : function() {
        // init autoplay
        // if (!settings.startClosed && settings.autoPlay) methods.play();
        if (settings.autoPlay) methods.play();
      }
    };

