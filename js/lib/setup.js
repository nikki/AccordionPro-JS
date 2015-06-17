    /**
     * SETUP PLUGIN
     */

    var setup = {

      /**
       * Backwards compatibility
       */

      backwardsCompatibility: function() {

        // theme
        if (settings.theme === 'dark') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'charcoal',
            style : 'gradient'
          };
        }

        if (settings.theme === 'light') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'white',
            style : 'gradient'
          };
        }

      },


      /**
       * Set plugin classes
       */

      setPluginClasses : function() {
        var classNames = 'accordionPro ';

        // set orientation classname
        classNames += horizontal ? 'horizontal ' : 'vertical ';

        // theme
        classNames += settings.theme + ' ';

        // colour scheme and style
        classNames += settings.colour.scheme ? ('scheme-' + settings.colour.scheme + ' ' + 'style-' + settings.colour.style + ' ') : '';

        // rounded
        classNames += settings.rounded ? 'rounded ' : '';

        // rtl
        classNames += settings.rtl ? 'rtl ' : '';

        // start closed
        classNames += settings.startClosed ? 'closed ' : '';

        // fitToContent
        classNames += (!horizontal && fitToContent) ? 'fitToContent ' : '';

        // scrollable
        classNames += settings.panel.scrollable ? 'scrollable ' : '';

        // scale images
        classNames += settings.panel.scaleImages ? 'scaleImages ' : '';

        // set classnames
        elem.addClass(classNames);
      },


      /**
       * Add slide number and data to each slide
       */

      setSlideClasses : function() {
        slides.each(function(index) {
          $(this)
            .addClass('slide slide-' + (index + 1))
            .attr('data-slide-name', elem[0].id + '-slide-' + (index + 1));
        });
      },


      /**
       * Add classes to tabs for styling
       */

      setTabClasses : function() {
        var classNames = '';

        // tab icon
        if (settings.tab.icon !== 'none') {
          classNames += settings.tab.icon;
        }

        // alternate text orientation
        if (settings.tab.textOrientation !== 'normal') {
          classNames += ' alt-text-orientation';
        }

        // set classnames
        tabs.addClass(classNames);
      },


      /**
       * Set plugin width and height
       */

      setPluginDimensions : function() {
        elem
          .outerWidth(horizontal ? settings.horizontalWidth : settings.verticalWidth)
          .outerHeight(horizontal ? settings.horizontalHeight : settings.verticalHeight);
      },


      /**
       * Calculate border, padding, etc
       */

      calcBoxDimensions : function() {
        var firstPanel = slides.eq(0).children('div');

        // cache parent height and width values
        parent.w = elem.width();
        parent.h = elem.height();

        // calculate slide border
        border = elem.outerHeight() - elem.height();

        // calculate slide offset (once only)
        offset =
          parseInt(firstPanel.css('marginLeft'), 10) ||
          parseInt(firstPanel.css('marginRight'), 10) ||
          parseInt(firstPanel.css('marginBottom'), 10) || 0;

        // calculate padding
        if (horizontal) {
          padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10);
        } else {
          padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10);
        }
      },


      /**
       * Calculate slide widths, heights, positions
       */

      calcSlideDimensions : function(index, panelH, selected) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = slide.w + tab.h;
          calc.height = '100%';
          calc.position = { left : index * tab.h, top : 0 };

          if (settings.rtl) {
            calc.position = { right : index * tab.h, top : 0 };
          }

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            calc.position[settings.rtl ? 'right' : 'left'] += slide.w;
          }
        } else {
          // variable height or flexible (fitToContent) height
          if (fitToContent) {
            calc.height = transparent ? panelH : panelH + tab.h; // variable height
          } else {
            calc.height = slide.h + tab.h; // fixed height
          }

          // width and default position
          calc.width = '100%';
          calc.position = { top : index * tab.h, left : 0 };

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            if (fitToContent) {
              calc.position.top += selected.height() - tab.h;
            } else {
              calc.position.top += slide.h;
            }
          }
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual slide widths, heights, positions
       */

      setSlideDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all slide widths, heights, positions
       */

      setSlidesDimensions : function() {
        var _this = this, selected;

        // cache slide length
        slide.l = slides.length;

        // calculate global slide dimensions
        if (horizontal) {
          slide.w = parent.w - slide.l * tab.h;
          slide.h = parent.h;
        } else {
          slide.w = tabs.eq(0).width(); // px value
          slide.h = parent.h - slide.l * tab.h;
        }

        // set selected slide class if startClosed option is not enabled
        if (!settings.startClosed) {
          selected = slides.eq(settings.tab.selected - 1).addClass('selected');
        }

        // set dimensions of each slide
        slides.each(function(index) {
          var $this = $(this),
              panelH = $this.children('div').height(),
              calc = _this.calcSlideDimensions(index, panelH, selected);

          _this.setSlideDimensions.call($this, calc);
        });
      },


      /**
       * Set individual tab widths, heights, positions
       */

      setTabDimensions : function() {
        this
          .width(tab.w)
          .height(tab.h)
          .css({
            'font-size' : settings.tab.fontSize + 'px',
            'line-height' : (tab.h - padding) + 'px',
            'font-family' : settings.tab.font
          });
      },


      /**
       * Set all tab widths, heights, positions
       */

      setTabsDimensions : function() {
        var _this = this,
            $first = tabs.first(),
            sheet = document.styleSheets[0];

        // calculate global tab dimensions
        tab.w = horizontal ? slide.h : '100%';

        // set dimensions of each tab
        tabs.each(function(index) {
          _this.setTabDimensions.call($(this));
        });

        // adjust line-height on :after
        if (padding && sheet && sheet.insertRule) {
          sheet.insertRule('.accordionPro .slide > :first-child:after { left: ' + padding + 'px; height: ' + (tab.h - padding) + 'px }', sheet.cssRules.length);
        }
      },


      /**
       * Calculate panel widths, heights, positions
       */

      calcPanelDimensions : function(index, panelH) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = transparent ? slide.w + tab.h : slide.w - offset - padding;
          calc.height = slide.h;
          calc.position = { left : (transparent ? 0 : tab.h), top : 0 };

          if (settings.rtl) {
            calc.position = { right : (transparent ? 0 - offset : tab.h - offset), top : 0 };
          }
        } else {
          if (fitToContent) {
            calc.height = 'auto'; // panelH?
          } else {
            calc.height = transparent ? (slide.h + tab.h) : slide.h - offset - padding;
          }

          // panel positions
          calc.width = '100%';
          calc.position = { top : (transparent ? 0 : tab.h), left : 0 };
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual panel widths, heights, positions
       */

      setPanelDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all panel widths, heights, positions
       */

      setPanelsDimensions : function() {
        var _this = this;

        panels.each(function(index) {
          var calc = _this.calcPanelDimensions(index);
          _this.setPanelDimensions.call($(this), calc);
        });
      },


      /**
       * Set custom tab images
       */

      setCustomTabImages : function() {
        var imgs = [],
            sheet = document.styleSheets[0];

        if (settings.tab.icon !== 'custom') return;
        if (!settings.tab.customIcons.length) return;

        // short ref to image array
        imgs = settings.tab.customIcons;

        // create styles for icons
        tabs.each(function(index) {
          if (sheet && sheet.insertRule) {
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + ' > :first-child:after { background-image: url(' + imgs[index % imgs.length] + ') }', sheet.cssRules.length);
          }
        });
      },


      /**
       * Set custom tab colours
       */

      setCustomTabColours : function() {
        var colours = [],
            sheet = document.styleSheets[0];

        if (!settings.tab.customColours.length) return;

        // short ref to colours array
        colours = settings.tab.customColours;

        // create styles for custom colours (so no need to remove style attr on destroy())
        tabs.each(function(index) {
          if (sheet && sheet.insertRule) {
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + ' > :first-child { background: ' + colours[index] + ' !important }', sheet.cssRules.length);
          }
        });
      },


      /**
       * Set plugin width and height when closed on init
       */

      setClosedPluginDimensions : function() {
        if (!settings.startClosed) return;
// console.log((slide.l * tab.h) + (border / 2) + (padding * 3) - 1);
        if (horizontal) {
          elem.css('width', (slide.l * tab.h) + (border / 2) + (padding * 2) - 1);
        } else {
          elem.css('height', slide.l * tab.h + border);
        }
      },


      /**
       * Show plugin
       */

      setPluginVisible : function() {
        elem.css('visibility', 'visible');
      },


      /**
       * Additional fixes for Internet Explo(d|r)er
       */

      internetExploder : function() {
        var ua = navigator.userAgent,
            index = ua.indexOf('MSIE');

        // not ie
        if (index < 0) return;

        // ie
        if (index !== -1) {
          ua = ua.slice(index + 5, index + 7);
          ua = +ua;

          // ie 9+ doesn't need additional styles...
          if (ua >= 9) return;

          // ... but ie 8 does :(
          if (ua === 8) {

          }

          // ie 7 and below
          if (ua <= 7) {
            methods.destroy();
            throw new Error('This plugin supports IE8+ only.');
          }

          // add ie classes for css fallbacks
          elem.addClass('ie ie' + ua);
        }
      },


      /**
       * Init plugin setup
       */

      init : function() {
        var _this = this;

        // set plugin dimensions, plugin and slide classes
        this.backwardsCompatibility();
        this.setPluginDimensions();
        this.setPluginClasses();
        this.setSlideClasses();
        this.setTabClasses();
        this.setCustomTabImages();
        this.setCustomTabColours();

        // !!! FOR TESTING
          _this.calcBoxDimensions();
          _this.setSlidesDimensions();
          _this.setTabsDimensions();
          _this.setPanelsDimensions();

          _this.setClosedPluginDimensions();
          _this.setPluginVisible();
          // _this.internetExploder();


        // check images are loaded before setting up slide positions
        imagesLoaded(elem, function() {

        });
      }
    };

