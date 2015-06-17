;(function($) {

  function AccordionPro(elem, options) {

    /**
     * Merge defaults with options in new settings object
     */

    var settings = $.extend(true, {}, this.defaults, options);


    /**
     * "Globals"
     */

    var $window = $(window),
        parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : settings.tab.size },
        panels = tabs.next(),
        padding = 0,
        border = 0,
        offset = 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        easing = 'ease-in-out',
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent'),
        touch = !!('ontouchstart' in window);

