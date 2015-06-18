    /**
     * PUBLIC METHODS
     */

    var methods = {
      trigger : function(index) {
        tabs.eq(index).trigger('click.accordionPro');
      },

      play : function(index) {
        var next;
        if (core.timer) return;

        // start autoplay
        core.timer = setInterval(function() {
          methods.trigger(core.nextSlide());
        }, settings.cycleSpeed);
      },

      stop : function() {
        clearTimeout(core.timer);
        core.timer = 0;
      },

      next : function() {
        methods.trigger(core.nextSlide());
      },

      prev : function() {
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
          .removeClass()
          .removeAttr('style')
          .removeAttr('data-slide-name')
          .children()
          .removeAttr('style');

        tabs
          .off('.accordionPro')
          .removeClass();
      }
    };


    /**
     * Init plugin
     */

    setup.init();
    events.init();
    core.init();


    /**
     * Return methods
     */

    methods._settings = settings;
    return methods;
  }

