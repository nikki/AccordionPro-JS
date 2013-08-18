;(function($) {

  var demo = $('#demo'),
      selects = $('.options select'),
      easing = $('#easing'),
      easingFn,
      outputToggle = $('.output h2 a'),
      resetBtn = $('#reset'),
      options,

      update = function() {
        var defaults = demo.accordionPro('debug').defaults;
          // reset 'global' options obj
          options = {};

          // set new opts
          selects.each(function() {
            var current = this.value,
            value;

            if (!isNaN(parseInt(current, 10))) {
              value = parseInt(current, 10);
            } else if (current === 'custom') {
                // value = parseInt($(this).next().val(), 10);
                value = $(this).next().val();
              } else if (current === 'true') {
                value = true;
              } else if (current === 'false') {
                value = false;
              } else {
                value = current;
              }

              if (defaults[this.name] !== value) {
                options[this.name] = value;
              }
            });

            // destroy and create new accordion with new opts
            demo.accordionPro('destroy').accordionPro(options);

            // output settings to textarea
            $('.output textarea').text('$("#yourAccordion").accordionPro(' + JSON.stringify(options) + ');');
          },

          reset = function() {
            options = {};

            selects.each(function() {
              $(this).children().eq(0).attr('selected', true);
            });

            $('.options').find('input[type=text]').remove();
            easing.find('option[value=swing]').attr('selected', true);

            demo.accordionPro('destroy');
            demo.accordionPro();

            $('.output textarea').text('$("#yourAccordion").accordionPro();');
          };

    // create easing select options from plugin
    for (easingFn in $.easing) {
      if (easingFn !== 'def') {
        easing.append($('<option value="' + easingFn + '">' + easingFn +'</option>')); // should use a frag, cba tho.
      }
    }

    easing.find('option[value=swing]').attr('selected', true);

    // init accordion
    demo.accordionPro();

    // get new options on change event
    selects.change(function() {
      this.value === 'custom' ? $(this).after('<input type="text" />') : update();
    });

    // new opts on enter
    $(window).keyup(function(e) {
      if (e.keyCode === 13) update();
    });

    // reset
    resetBtn.click(function(e) {
      reset();
      e.preventDefault();
    });

    // show/hide code output
    outputToggle.click(function(e) {
      $(this).parent().next().slideToggle();
      e.preventDefault();
    });

  })(jQuery);