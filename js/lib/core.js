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
      previousSlide : -1,


      /**
       * Set next slide ref
       */

      nextSlide : function() {
        var t = core.currentSlide;
        return ++t % slide.l;
      },


      /**
       * Update slide counters
       */

      updateSlideRefs : function() {
        core.previousSlide = core.currentSlide;
        core.currentSlide = slides.index(this);
      },


      /**
       * Animate single slide
       */

      animateSlide : function(props) {
        // animate single slide
        this
          .stop(true)
          .animate(
            props,
            settings.slideSpeed
          )
      },


      /**
       * Animate group of slides
       */

      animateSlides : function(p) {
        var expr = '',
            pos = 0;

        // side 0 = left/top, side 1 = bottom/right
        pos = p.side ? 0 : fitToContent ? p.triggerHeight : slide[horizontal ? 'w' : 'h'];

        // build expression
        expr += p.side ? ':lt(' : ':gt(';
        expr += p.side ? p.index + 1 : p.index;
        expr += ')';

        // animate slides
        slides
          .filter(expr)
          .each(function() {
            var $this = $(this);

            // redefine index
            p.index = slides.index($this);

            // set position
            p[p.position] = (p.index * tab.h) + pos;

            // animate single slide
            core.animateSlide.call($this, p);
          });

        core.setSelectedSlide.call(p.selected ? this.prev() : this);
      },


      /**
       * Trigger slide animation
       */

      trigger : function() {
        var $slide = $(this).parent(),
            props = {
              index : slides.index($slide),
              position : horizontal ? (settings.rtl ? 'right' : 'left') : 'top',
              triggerHeight : 0,
              side : 0,
              selected : false
            };

        // side 0 = left/top, side 1 = bottom/right (flipped for rtl)
        props.side = parseInt($slide.css(props.position), 10) > props.index * tab.h;

        // if slide already selected, push to other side of expr
        if ($slide.hasClass('selected') && !props.side) {
          props.selected = props.index;
          props.index -= props.selected ? 1 : 0;
        };

        props.triggerHeight = slides.eq(props.index).height() - tab.h;

        // update slide refs
        core.updateSlideRefs.call(props.selected ? $slide.prev() : $slide);

        // animate slides
        core.animateSlides.call($slide, props);

        // animate both sides for vertical fitToContent
        if (fitToContent) {
          if (props.side) { // bottom/right
            props.side = false;
            core.animateSlides.call($slide, props);
          }

          // fit accordion dimensions to content
          core.fitToContent(props);
        }
      },


      /**
       * Set currently selected slide class, update slide refs, trigger callbacks
       */

      setSelectedSlide : function() {
        // remove selected class
        slides.removeClass('selected');

        // add selected class to selected slide
        this.addClass('selected');
      },


      /**
       *
       */

      triggerCallbacks : function() {
        if (core.currentSlide === core.previousSlide) return;

        // trigger onSlideOpen callback
        settings.onSlideOpen.call(slides.eq(core.currentSlide).children('div'));

        // trigger onSlideClose callback
        settings.onSlideClose.call(slides.eq(core.previousSlide).children('div'));
      },


      /**
       * Fit the accordion to the content height (vertical fitToContent option)
       */

      fitToContent : function(p) {
        var height = p && (p.triggerHeight + tab.h) || slides.eq(core.currentSlide).height();

        // // set height
        elem.height(((slide.l - 1) * tab.h) + height);
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
        var name;

        // still closed?
        if (elem.hasClass('closed')) return;

        // link refers to a slide?
        name = slides.filter(function() {
          return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
        });

        // if slide name exists, trigger slide
        if (name && name.length) {
          methods.trigger(slides.index(name));
          methods.pause();
        }
      },


      /**
       *
       */

      triggerDirection : function(dir) {
        switch (dir) {
          case 'left':
            if (horizontal) {
              if (settings.rtl) {
                // don't select previous slide if current slide is index zero
                if (core.currentSlide) methods.prev();
              } else {
                methods.next();
              }
            }

            break;
          case 'right':
            if (horizontal) {
              if (settings.rtl) {
                methods.next();
              } else {
                if (core.currentSlide) methods.prev();
              }
            }

            break;
          case 'up':
            if (!horizontal) {
              methods.next();
            }

            break;
          case 'down':
            if (!horizontal && core.currentSlide) {
              methods.prev();
            }

            break;
          default:
            break;
        }
      },


      /**
       *
       */

      scalePlugin : function() {
        var scale = Math.min(elem.parent().width() / settings.horizontalWidth), // linear scale
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

          // scale margin bottom
          elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
        } else {
          elem.css('zoom', scale);
        }
      }
    };

