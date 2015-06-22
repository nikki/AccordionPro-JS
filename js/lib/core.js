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
       * Animate single slide
       */

      animateSlide : function(props) {
        var _this = this;

        // animate single slide
        this
          .stop(true)
          .animate(
            props,
            settings.slideSpeed,
            function() {
              // set selected slide if clicked 'self'
              if (_this.hasClass('selected') && !props.side) {
                core.setSelectedSlide.call(_this.prev());
              }
            }
          )
      },


      /**
       * Animate group of slides
       */

      animateSlides : function(props) {
        var _this = this,
            index = props.index,
            triggerHeight = slides.eq(index).height() - tab.h,
            position = props.position,
            side = props.side,
            expr = '',
            pos = 0;

        // side 0 = left/top, side 1 = bottom/right
        pos = side ? 0 : fitToContent ? triggerHeight : slide[horizontal ? 'w' : 'h'];

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
                props = {
                  side : side
                };

            // set position
            props[position] = (index * tab.h) + pos;

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
              self : false
            };

        // side 0 = left/top, side 1 = bottom/right (flipped for rtl)
        props.side = parseInt($slide.css(props.position), 10) > props.index * tab.h;

        // if slide already selected, push to other side of expr
        if ($slide.hasClass('selected') && !props.side) {
          props.self = true;
          props.index -= 1;
        };

        // animate slides
        core.animateSlides.call($slide, props);

        // animate both sides for vertical fitToContent
        if (fitToContent) {
          props.side = !props.side;
          core.animateSlides.call($slide, props);

          // fit accordion dimensions to content
          core.fitToContent(props.self);
        }
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
       * Fit the accordion to the content height (vertical fitToContent option)
       */

      fitToContent : function(selected) {
        var $slide = slides.eq(core.currentSlide - (selected ? 1 : 0));

        // ignore 'self' click on first slide
        if (selected && !core.currentSlide) return;

        // set height
        elem.height(((slide.l - 1) * tab.h) + $slide.height());
      },


      /**
       * Activate closed accordion
       */

      triggerFromClosed : function(e) {
        if (fitToContent) {
          core.fitToContent();
        } else {
          setup.setPluginDimensions();
        }

        // remove closed class
        elem.removeClass('closed');

        // unbind event
        tabs.off('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed');

        // trigger autoplay
        if (settings.autoPlay) methods.play();
      },


      /**
       * Trigger slide animation from a link
       */

      triggerLink : function(e) {
        var name = slides.filter(function() {
          return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
        });

        // if slide name exists, trigger slide
        if (name && name.length) {
          methods.trigger(slides.index(name));
          methods.pause();
        }
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
        var scale = Math.min(elem.parent().outerWidth() / settings.horizontalWidth), // linear scale
            prefixes = ['Webkit', 'Moz', 'Ms', 'O', ''];

        // only scale horizontal accordions
        if (!horizontal) return;

        // limit max scale to 1
        scale = +(Math.min(scale, 1).toFixed(2));

        // css3 scaling not supported in ie8
        if (!elem.hasClass('ie8')) {
          $.each(prefixes, function(index, prefix) {
            elem.css((prefix + 'Transform'), 'scale(' + scale + ')');
          });

          if (horizontal) {
            elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
          }
        } else {
          elem.css('zoom', scale);
        }
      }
    };

