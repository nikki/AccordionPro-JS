    /**
     * BIND EVENTS
     */

    var events = {

      /**
       * Bind click and touchstart
       */

      click : function() { // +touchstart
        if (settings.activateOn === 'click') {
          // trigger animation cycle
          tabs.on('click.accordionPro touchstart.accordionPro', core.trigger);

          if (settings.startClosed) {
            tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Bind mouseover
       */

      mouseover : function() {
        if (settings.activateOn === 'mouseover') {
          // trigger animation cycle
          tabs.on('click.accordionPro touchstart.accordionPro mouseover.accordionPro', core.trigger);

          // fire start closed event once
          if (settings.startClosed) {
            tabs.on('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Pause on hover
       */

      hover : function() {
        if (settings.pauseOnHover && settings.autoPlay) {
          elem
            .on('mouseover.accordionPro', function() {
              if (!elem.hasClass('closed')) {
                core.timer && methods.stop();
              }
            })
            .on('mouseout.accordionPro', function() {
              if (!elem.hasClass('closed')) {
                !core.timer && methods.play(core.currentSlide);
              }
            });
        }
      },


      /**
       * Bind swipe for touch enabled devices
       */

      swipe : function() {
        var startPos = {
              x : 0,
              y : 0
            };

        /**
         * Helper -> get position of client touch
         */

        function getTouchPos(e, maxTouches) {
          var x, y;

          if (touch && e.touches) {
            if (e.touches.length > maxTouches) return;
            x = e[maxTouches ? 'touches' : 'changedTouches'][0].clientX;
            y = e[maxTouches ? 'touches' : 'changedTouches'][0].clientY;
          } else {
            x = e.clientX;
            y = e.clientY;
          }

          return { x : x, y : y };
        }


        /**
         * Trigger swipe on touch enabled devices
         */

        if (touch) {
          // unbind existing events
          tabs.off('.accordionPro');

          // bind swipe events
          slides.on({
            touchstart : function(e) {
              startPos = getTouchPos(e.originalEvent, 1);
            },

            touchend : function(e) {
              var endPos = getTouchPos(e.originalEvent, 0);

              // calculate swipe direction
              var dx = endPos.x - startPos.x,
                  absDx = Math.abs(dx),
                  dy = endPos.y - startPos.y,
                  absDy = Math.abs(dy);

              // trigger slide
              core.triggerDirection(absDx > absDy ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
            }
          })
        }
      },


      /**
       * Bind hashchange
       */

      hashchange : function() {
        if (settings.linkable) {
          $window.on('load.accordionPro hashchange.accordionPro', core.triggerLink);
        }
      },


      /**
       * Bind resize and orientationchange
       */

      resize : function() { // +orientationchange
        var timer = 0;

        // set initial scale (before 200ms timeout)
        core.scalePlugin();

        if (horizontal && settings.responsive) {
          $window.on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
            // approximates onresizeend
            clearTimeout(timer);

            // trigger scaling
            timer = setTimeout(function() {
              core.scalePlugin();
            }, 200);
          });
        }
      },


      /**
       * Init event binds
       */

      init : function() {
        for (var i in this) {
          if (this.hasOwnProperty(i)) {
            if (i !== 'init') this[i]();
          }
        }
      }
    };

