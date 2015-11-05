 /**
   * PLUGIN DEFAULTS
   */

  AccordionPro.prototype.defaults = {
    /* layout */
    orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
    startClosed : false,                    // start in a closed position

    /* aesthetics */
    theme : 'basic',                        // 'basic', 'bordered', 'stitch' or 'transparent'
    colour : {
      scheme : 'charcoal',                  // colour scheme, 'charcoal' set by default; choose from 'charcoal', 'white', 'silver', 'grey', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', and 'dark-blue'
      style : 'flat'                        // choose from 'flat' or 'gradient'
    },
    rounded : false,                        // square or rounded corners
    rtl : false,                            // right to left layout

    /* horizontal accordion options */
    responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
    horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
    horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

    /* vertical accordion options */
    verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
    verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
    verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

    /* tabs */
    tab : {
      size : 48,                            // set tab size
      fontSize : 16,                        // set tab font size
      font : 'Arial',                       // set tab font family
      icon : 'number',                      // set tab icon -> 'number', 'chevron', 'disc', 'square', 'custom', or 'none'
      customIcons : [],                     // set a custom image for each icon
      customColours : [],                   // set a custom colour for each tab
      selected : 1                          // displays slide (n) on page load
    },

    /* panels */
    panel : {
      scrollable : false,                   // trigger scrollbar on vertical overflow
      scaleImages : true,                   // scales images to fit slide width and height
      padding : 0                           // adds internal padding (px [integer]) to slide panels
    },

    /* events */
    activateOn : 'click',                   // click or mouseover
    onSlideOpen : function() {},            // callback on slide open
    onSlideClose : function() {},           // callback on slide animation complete

    /* animations */
    autoPlay : false,                       // automatically cycle through slides
    cycleSpeed : 6000,                      // time between slide cycles
    slideSpeed : 800,                       // slide animation speed

    /* miscellaneous */
    pauseOnHover : true,                    // pause on hover
    linkable : false                        // link slides via hash
  };

