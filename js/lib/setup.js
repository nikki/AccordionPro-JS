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

        // there is no stitch gradient, only stitch flat
        if (settings.theme === 'stitch') settings.colour.style = 'flat';

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

        // calculate tab border (a lot more work than it should be because FF gets it wrong)
        tabBorder = Math.ceil(+(tabs.eq(0).css('borderLeftWidth')).slice(0, -2)) * 2;
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
          .height(tab.h - (tabBorder ? (tabBorder + padding) : 0))
          .css({
            'font-size' : settings.tab.fontSize + 'px',
            'line-height' : (tab.h - (tabBorder ? (tabBorder + padding) : padding)) + 'px',
            'font-family' : settings.tab.font
          });

        // fixes for stitch
        if (settings.theme === 'stitch') {
          this.width(this.width() - tabBorder)
        }
      },


      /**
       * Set all tab widths, heights, positions
       */

      setTabsDimensions : function() {
        var _this = this,
            $first = tabs.first(),
            sheet = document.styleSheets[0];

        // calculate global tab dimensions
        tab.w = horizontal ? slide.h : elem.width();

        // set dimensions of each tab
        tabs.each(function(index) {
          _this.setTabDimensions.call($(this));
        });

        // adjust line-height on :after
        if (padding && sheet && sheet.insertRule) {
          sheet.insertRule('.accordionPro .slide > :first-child:after { left: ' + padding + 'px; height: ' + (tab.h - (tabBorder ? (tabBorder + padding) : padding)) + 'px }', sheet.cssRules.length);
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
        var icons = settings.tab.customIcons,
            imgs = [],
            sheet = document.styleSheets[0],
            length = 0;

        if (settings.tab.icon !== 'custom') return;
        length = icons.length;
        if (!length) return;

        // short ref to image array
        $.each(icons, function(index, icon) {
          var i = new Image();

          imgs[index] = {
            src : icons[index],
            width : null
          };

          // // preload image to find it's width
          // i.src = imgs[index].src;

          // // console.log(image);
          // i.onload = function() {
          //   imgs[index].width = this.width;
          //   length--;

          //   if (!length) callback();
          // }
        });

callback();
        // create styles for icons
        function callback() {
          tabs.each(function(index) {
            if (sheet && sheet.insertRule) {
              sheet.insertRule('.accordionPro .slide-' + (index + 1) + ' > :first-child:after { background-image: url(../' + imgs[index % imgs.length].src + ') }', sheet.cssRules.length);

              // fix for blurry icons in webkit
              // sheet.insertRule('.accordionPro .slide > :first-child:after { -webkit-transform-origin: ' + (50 + (0.5 / imgs[index % imgs.length].width * 100)) + '% 50% }', sheet.cssRules.length);
            }
          });
        }
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
            sheet.insertRule('.accordionPro.stitch .slide-' + (index + 1) + ' > :first-child { background-image: url("data:image/png;base64,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") !important }', sheet.cssRules.length);
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + '.selected > :first-child:before { background-color: ' + colours[index] + ' !important }', sheet.cssRules.length);
          }
        });
      },


      /**
       * Set plugin width and height when closed on init
       */

      setClosedPluginDimensions : function() {
        if (!settings.startClosed) return;

        if (horizontal) {
          elem.css('width', (slide.l * tab.h) + border - padding);
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

