# Accordion Pro JS
A responsive accordion plugin for jQuery.

## Dependencies
Before we begin with the setup, I’d like to make one important point: Accordion Pro JS makes use of changes made in jQuery 1.8.3, and therefore requires this version or higher to function correctly.

## Getting Started
To implement the plugin, firstly, include the plugin’s CSS, minified JS, and jQuery dependency in the of your HTML page, like so:

```
<head>
<link rel="stylesheet" href="css/accordionpro.min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="js/jquery.accordionpro.min.js"></script>
</head>
```

## Folder Structure
```
Root
    /css
        accordionpro.min.css
    /js
        jquery.accordionpro.min.js
```

## Markup
The plugin markup is comprised of a div, with nested list elements for each of the slides. Copy the following markup into your HTML page:

```
<div id="yourDiv" class="accordionPro">
    <ol>
        <li>
            <h2>Slide One</h2>
            <div>

            </div>
        </li>
        <li>
            <h2>Slide Two</h2>
            <div>

            </div>
        </li>
        <li>
            <h2>Slide Three</h2>
            <div>

            </div>
        </li>
        <li>
            <h2>Slide Four</h2>
            <div>

            </div>
        </li>
        <li>
            <h2>Slide Five</h2>
            <div>

            </div>
        </li>
    </ol>
    <noscript>
        <p>Please enable JavaScript to get the full experience.</p>
    </noscript>
</div>
```

Please note that you don't have to use a H2 for the tab element - you can use any element you like.

## Instantiation
To create a basic instance of the plugin, instantiate the plugin (underneath the markup):

```
<script>$('#yourdiv').accordionPro();</script>
```

Options are passed into the plugin using a JavaScript object. For example, the instance on this page was created with the following code:

```
<script>
    $('#demo').accordionPro({
        theme : 'bordered',
        colour : { style : 'gradient' },
        rounded: true,
        autoPlay : true
    });
</script>
```

The [examples.html](./documentation/examples.html) file has a number of different plugin setups for you to copy and paste as required.

## Options
The plugin has a multitude of options, so you can tailor the aesthetics and functionality to suit your needs.

```
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
horizontalWidth : 900,                  // base width; fixed (px \[integer\]) - responsive scaling is relative to this value
horizontalHeight : 300,                 // base horizontal accordion height; fixed (px \[integer\]) - responsive scaling is relative to this value

/* vertical accordion options */
verticalWidth : '100%',                 // fixed (px \[integer\]) or fluid (% \[string\])
verticalHeight : 500,                   // base vertical accordion height; fixed (px \[integer\])
verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

/* tabs */
tab : {
  size : 48,                            // set tab size
  fontSize : 16,                        // set tab font size
  font : 'Arial',                       // set tab font family
  icon : 'number',                      // set tab icon -> 'number', 'chevron', 'disc', 'square', 'custom', or 'none'
  customIcons : \[\],                     // set a custom image for each icon
  customColours : \[\],                   // set a custom colour for each tab
  selected : 1                          // displays slide (n) on page load
},

/* panels */
panel : {
  scrollable : false,                   // trigger scrollbar on vertical overflow
  scaleImages : true,                   // scales images to fit slide width and height
  padding : 0                           // adds internal padding (px \[integer\]) to slide panels
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
```

## Methods
Accordion Pro JS has a number of methods available.

```
trigger(n)                              // trigger slide(n)
play                                    // trigger autoPlay on a stopped accordion
stop                                    // stop an accordion playing
next                                    // trigger the next slide
prev                                    // trigger the previous slide
destroy                                 // remove the accordion, destroying all event handlers and styles
debug                                   // returns a debug object
```

All of these methods are chainable (i.e. they return the original DOM object) with the exception of the debug method. To call a method, use:

```
$('#yourdiv').accordionPro('play');
```

To use trigger, pass in the number of the slide you want to activate

```
$('#yourdiv').accordionPro('trigger', 2);
```

To chain methods:

```
$('#yourdiv').accordionPro('next').accordionPro('next');
```

## Browser Differences
Not all of the CSS3 properties used to create Accordion Pro JS are supported in all browsers. The appearance of accordions will be consistent in modern browsers (Chrome, Firefox, Safari), but where older versions of Internet Explorer are lacking the requisite CSS3 support, styles will degrade gracefully.

## Credits
This plugin wouldn't be possible if it weren't for the open-source efforts of others. Many thanks to:

*   Orman Clark for the original [accordion design](http://www.premiumpixels.com/freebies/horizontal-accordion-slider-psd/);
*   Addy Osmani for the [CSS3 Transitions shim](http://addyosmani.com/blog/css3transitions-jquery/).

Thanks a bunch guys!

## Thank You!
I hope you have fun with your new plugin. If you have any questions that aren’t covered by this document, then please don’t hesitate to get in touch.