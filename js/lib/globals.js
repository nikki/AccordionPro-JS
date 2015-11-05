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
        border = 0,
        offset = 0,
        padding = 0,
        tabBorder = 0,
        panelPadding = (settings.panel && settings.panel.padding && typeof settings.panel.padding === 'number') ? settings.panel.padding : 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent'),
        easing = 'ease-in-out',
        touch = !!('ontouchstart' in window),
        sheet;

