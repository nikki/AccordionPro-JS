    /**
     * BIND EVENTS
     */

    var events = {

      /**
       * Bind click
       */

      click : function() {
        if (settings.activateOn === 'click') {
          // trigger animation cycle
          // if (window.PointerEvent) {
          //   tabs.on('pointerdown.accordionPro', methods.trigger);
          // } else {
            tabs.on('click.accordionPro touchstart.accordionPro', methods.trigger);
          // }

          if (settings.startClosed) {
            // if (window.PointerEvent) {
            //   tabs.on('pointerdown.accordionPro.closed', core.triggerFromClosed);
            // } else {
              tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
            // }
          }
        }
      },


      /**
       * Bind mouseover
       */

      mouseover : function() {
        if (settings.activateOn === 'mouseover') {
          // trigger animation cycle
          tabs.on('mouseover.accordionPro touchstart.accordionPro', methods.trigger);

          // fire start closed event once
          if (settings.startClosed) {
            tabs.on('mouseover.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Pause autoPlay on hover
       */

      hover : function() {
        if (settings.pauseOnHover && settings.autoPlay && !touch) {
          elem
            .on({
              'mouseover.accordionPro' : function() {
                if (!elem.hasClass('closed')) {
                  core.timer && methods.stop();
                }
              },
              'mouseout.accordionPro' : function() {
                if (!elem.hasClass('closed')) {
                  !core.timer && methods.play();
                }
              }
            });
        }
      },


      /**
       * Pause autoPlay on touch interaction
       */

      touch : function() {
        if (settings.autoPlay && touch) {
          elem
            .on({
              'touchmove.accordionPro' : function() {
                core.timer && methods.pause();
              }
            });
        }
      },


      /**
       * Bind swipe for touch enabled devices
       */

      swipe : function() {
        var tap = false,
            startPos = {
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
          tabs.off('click.accordionPro mouseover.accordionPro');

          // scrollable panels aren't compatible with swipe events
          if (settings.panel.scrollable) return;

          // bind swipe events
          slides.on({
            'touchstart.accordionPro' : function(e) {
              if ($(e.target).is(tabs)) {
                tap = true;
              }

              startPos = getTouchPos(e.originalEvent, 1);
            },

            'touchmove.accordionPro' : function(e) {
              e.preventDefault();
            },

            'touchend.accordionPro' : function(e) {
              var endPos = getTouchPos(e.originalEvent, 0);

              // calculate swipe direction
              var dx = endPos.x - startPos.x,
                  absDx = Math.abs(dx),
                  dy = endPos.y - startPos.y,
                  absDy = Math.abs(dy);

              // trigger slide (if the tab wasn't tapped)
              if (!tap) core.triggerDirection(absDx > absDy ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
              tap = false;
            }
          });
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

      resize : function() {
        var timer = 0;

        if (horizontal && settings.responsive) {
          // set initial scale (before 200ms timeout)
          core.scalePlugin();

          // on load...
          $window.on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
            // approximates onresizeend
            clearTimeout(timer);

            // trigger scaling
            timer = setTimeout(function() {
              core.scalePlugin();
            }, 200);
          });
        }

        if (fitToContent) {
          $window.on('resize.accordionPro orientationchange.accordionPro', function() {
            // trigger fitToContent
            core.fitToContent();

            // reflow slide positions
            setup.setSlidesDimensions(true);
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

