  /**
   * ADD PLUGIN TO $.fn
   */

  $.fn.accordionPro = function(method, param) {
    var elem = this,
        instance = elem.data('accordionPro');

    // if creating a new instance
    if (typeof method === 'object' || !method) {
      return elem.each(function() {
        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        elem.data('accordionPro', new AccordionPro(elem, method));
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // zero-based index for trigger method
      if (method === 'trigger' && typeof param === 'number') param -= 1;

      // chainable methods
      instance[method].call(elem, param);
      return elem;
    }
  };
