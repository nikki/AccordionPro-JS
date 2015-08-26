    /**
     * PUBLIC METHODS
     */

    var methods = {
      trigger : function(e) {
        var _this = (typeof e === 'number') ? tabs.eq(e)[0] : this;

        core.trigger.call(_this, e);
        core.triggerCallbacks();
      },

      play : function() {
        if (core.timer) return;

        // start autoplay
        core.timer = setInterval(function() {
          methods.trigger(core.nextSlide());
        }, settings.cycleSpeed);
      },

      stop : function() {
        clearInterval(core.timer);
        core.timer = 0;
      },

      pause : function() {
        methods.stop();

        // pause
        if (settings.autoPlay) methods.play();
      },

      next : function() {
        methods.pause();
        methods.trigger(core.nextSlide());
      },

      prev : function() {
        methods.pause();
        methods.trigger(core.currentSlide - 1);
      },

      destroy : function() {
        // stop autoplay
        methods.stop();

        // remove hashchange and resize events bound to window
        $(window).off('.accordionPro');

        // remove generated styles, classes, data, events
        this
          .off('.accordionPro')
          .removeData('accordionPro')
          .removeAttr('style')
          .removeClass();

        slides
          .off('.accordionPro')
          .removeAttr('data-slide-name')
          .removeAttr('style')
          .removeClass()
          .children()
          .removeAttr('style');

        tabs
          .off('.accordionPro')
          .removeClass();
      },

      debug : function() {
        return {
          elem : elem,
          settings : settings,
          methods : methods,
          setup : setup,
          core : core
        };
      }
    };


    /**
     * Init plugin
     */

    setup.init();
    events.init();


    /**
     * Return methods
     */

    methods._settings = settings;
    return methods;
  }

