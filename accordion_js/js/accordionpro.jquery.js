/*************************************************!
*
*   project:    Accordion Pro - a responsive accordion plugin for jQuery
*   author:     Nicola Hibbert
*   url:        http://codecanyon.net/item/accordion-pro/1506395?ref=nicolahibbert
*   demo:       http://accordionpro.nicolahibbert.com/
*
*   Version:    1.0
*   Copyright:  (c) 2010-2013 Nicola Hibbert
*
**************************************************/

;(function($) {

    var AccordionPro = function(elem, options) {

        var defaults = {
            containerWidth : 960,                   // fixed (px)
            containerHeight : 320,                  // fixed (px)
            headerWidth : 48,                       // fixed (px)
            responsive : false,                     // overrides the above three settings, accordion adjusts to fill container

            activateOn : 'click',                   // click or mouseover
            firstSlide : 1,                         // displays slide (n) on page load
            slideSpeed : 800,                       // slide animation speed
            onTriggerSlide : function(e) {},        // callback on slide activate
            onSlideAnimComplete : function() {},    // callback on slide anim complete

            autoPlay : false,                       // automatically cycle through slides
            pauseOnHover : false,                   // pause on hover
            cycleSpeed : 6000,                      // time between slide cycles
            easing : 'swing',                       // custom easing function

            theme : 'basic',                        // basic, dark, light, or stitch
            rounded : false,                        // square or rounded corners
            enumerateSlides : false,                // put numbers on slides
            linkable : false                        // link slides via hash
        },

        // merge defaults with options in new settings object
            settings = $.extend({}, defaults, options),

        // 'globals'
            slides = elem.children('ol').children('li'),
            header = slides.children(':first-child'),
            slideLen = slides.length,
            slideWidth = settings.containerWidth - slideLen * settings.headerWidth,

        // public methods
            methods = {

                // start elem animation
                play : function(index) {
                    var next = core.nextSlide(index && index);

                    if (core.playing) return;

                    // start autoplay
                    core.playing = setInterval(function() {
                        header.eq(next()).trigger('click.accordionPro');
                    }, settings.cycleSpeed);
                },

                // stop elem animation
                stop : function() {
                    clearInterval(core.playing);
                    core.playing = 0;
                },

                // trigger next slide
                next : function() {
                    methods.stop();
                    header.eq(core.currentSlide === slideLen - 1 ? 0 : core.currentSlide + 1).trigger('click.accordionPro');
                },

                // trigger previous slide
                prev : function() {
                    methods.stop();
                    header.eq(core.currentSlide - 1).trigger('click.accordionPro');
                },

                // destroy plugin instance
                destroy : function() {
                    // stop autoplay
                    methods.stop();

                    // remove hashchange event bound to window
                    $(window).off('.accordionPro');

                    // remove generated styles, classes, data, events
                    elem
                        .attr('style', '')
                        .removeClass('accordionPro basic dark light stitch')
                        .removeData('accordionPro')
                        .off('.accordionPro')
                        .find('li > :first-child')
                        .off('.accordionPro')
                        .filter('.selected')
                        .removeClass('selected')
                        .end()
                        .find('b')
                        .remove();

                    slides
                        .removeClass('slide')
                        .children()
                        .attr('style', '');
                },

                // poke around the internals (NOT CHAINABLE)
                debug : function() {
                    return {
                        elem : elem,
                        defaults : defaults,
                        settings : settings,
                        methods : methods,
                        core : core
                    };
                }
            },

        // core utility and animation methods
            core = {

                // set style properties
                setStyles : function() {
                    // set container height and width, theme and corner style
                    elem
                        .width(settings.containerWidth)
                        .height(settings.containerHeight)
                        .addClass('accordionPro')
                        .addClass(settings.rounded && 'rounded')
                        .addClass(settings.theme);

                    // set slide heights
                    slides
                        .addClass('slide')
                        .children(':first-child')
                        .height(settings.headerWidth);

                    // set slide positions
                    core.setSlidePositions();

                    // override container and slide widths for responsive setting
                    if (settings.responsive) core.responsive();
                },

                // set initial positions for each slide
                setSlidePositions : function() {
                    var selected = header.filter('.selected');

                    // account for already selected slide
                    if (!selected.length) header.eq(settings.firstSlide - 1).addClass('selected');

                    header.each(function(index) {
                        var $this = $(this),
                            left = index * settings.headerWidth,
                            margin = header.first().next(),
                            offset = parseInt(margin.css('marginLeft'), 10) || parseInt(margin.css('marginRight'), 10) || 0;

                        // compensate for already selected slide on resize
                        if (selected.length) {
                            if (index > header.index(selected)) left += slideWidth;
                        } else {
                            if (index >= settings.firstSlide) left += slideWidth;
                        }

                        // set each slide position
                        $this
                            .css('left', left)
                            .width(settings.containerHeight)
                            .next()
                                .width(slideWidth - offset)
                                .css({ left : left, paddingLeft : settings.headerWidth });

                        // add number to bottom of tab
                        settings.enumerateSlides && $this.append('<b>' + (index + 1) + '</b>');

                    });
                },

                // responsive styles
                responsive : function() {
                    var prefixes = ['Webkit', 'Moz', 'ms', 'O', ''],
                        width = elem.parent().width(),
                        scale = width / settings.containerWidth; // linear scale

                    console.log(scale);
/*
                    if (linear) {
                        // linear scale
                        scale.x = scale.y = Math.min(obj.width / 480, obj.height / 320); // linear scale

                        // don't scale beyond min size
                        if (scale.x < 1) return;
                    } else {
                        scale.x = obj.width / 480;
                        scale.y = obj.height / 320;
                    }
*/

                    prefixes.forEach(function(prefix) {
                        elem[0].style[prefix ? prefix + 'Transform' : 'transform'] = 'scale(' + scale + ', ' + scale + ')';
                    });
                },

                // bind events
                bindEvents : function() {
                    var resizeTimer = 0;

                    // bind click and mouseover events
                    if (settings.activateOn === 'click') {
                        header.on('click.accordionPro', core.triggerSlide);
                    } else if (settings.activateOn === 'mouseover') {
                        header.on('click.accordionPro mouseover.accordionPro', core.triggerSlide);
                    }

                    // bind hashchange event
                    if (settings.linkable) {
                        $(window).on('hashchange.accordionPro', function(e) {
                            var url = slides.filter(function() {
                                return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
                            });

                            // if slide name exists
                            if (url.length) {
                                // trigger slide
                                core.triggerSlide.call(url.children('h2')[0], e);
                            }
                        });
                    }

                    // pause on hover (can't use custom events with $.hover())
                    if (settings.pauseOnHover && settings.autoPlay) {
                        elem
                            .on('mouseover.accordionPro', function() {
                                core.playing && methods.stop();
                            })
                            .on('mouseout.accordionPro', function() {
                                !core.playing && methods.play(core.currentSlide);
                            });
                    }

                    // resize and orientationchange
                    if (settings.responsive) {
                        $(window).on('resize.accordionPro orientationchange.accordionPro', function() {
                            // approximates 'onresizeend'
                            clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(function() {
                                core.responsive();
                            }, 100);
                        });
                    }
                },

                // counter for autoPlay (zero index firstSlide on init)
                currentSlide : settings.firstSlide - 1,

                // next slide index
                nextSlide : function(index) {
                    var next = index + 1 || core.currentSlide + 1;

                    // closure
                    return function() {
                        return next++ % slideLen;
                    };
                },

                // holds interval counter
                playing : 0,

                slideAnimCompleteFlag : false,

                // trigger slide animation
                triggerSlide : function(e) {
                    var $this = $(this),
                        tab = {
                            elem : $this,
                            index : header.index($this),
                            next : $this.next(),
                            prev : $this.parent().prev().children('h2'),
                            parent : $this.parent()
                        };

                    // current hash not correct?
                    if (settings.linkable && tab.parent.attr('data-slide-name')) {
                        if (tab.parent.attr('data-slide-name') !== window.location.hash.split('#')[1]) {
                            // exit early and try again (prevents double trigger (issue #60))
                            return window.location.hash = '#' + tab.parent.attr('data-slide-name');
                        }
                    }

                    // update core.currentSlide
                    core.currentSlide = tab.index;

                    // reset onSlideAnimComplete callback flag
                    core.slideAnimCompleteFlag = false;

                    // trigger callback in context of sibling div (jQuery wrapped)
                    settings.onTriggerSlide.call(tab.next, $this);

                    // animate
                    if ($this.hasClass('selected') && $this.position().left < slideWidth / 2) {
                        // animate single selected tab
                        core.animSlide.call(tab);
                    } else {
                        // animate groups
                        core.animSlideGroup(tab);
                    }

                    // stop autoplay, reset current slide index in core.nextSlide closure
                    if (settings.autoPlay) {
                        methods.stop();
                        methods.play(header.index(header.filter('.selected')));
                    }
                },

                animSlide : function(triggerTab) {
                    var _this = this;

                    // set pos for single selected tab
                    if (typeof this.pos === 'undefined') this.pos = slideWidth;

                    // remove, then add selected class
                    header.removeClass('selected').filter(this.elem).addClass('selected');

                    // if slide index not zero
                    if (!!this.index) {
                        this.elem
                            .add(this.next)
                            .stop(true)
                            .animate({
                                left : this.pos + this.index * settings.headerWidth
                            },
                                settings.slideSpeed,
                                settings.easing,
                                function() {
                                    // flag ensures that fn is only called one time per triggerSlide
                                    if (!core.slideAnimCompleteFlag) {
                                        // trigger onSlideAnimComplete callback in context of sibling div (jQuery wrapped)
                                        settings.onSlideAnimComplete.call(triggerTab ? triggerTab.next : _this.prev.next());
                                        core.slideAnimCompleteFlag = true;
                                    }
                                });

                            // remove, then add selected class
                            header.removeClass('selected').filter(this.prev).addClass('selected');

                    }
                },

                // animates left and right groups of slides
                animSlideGroup : function(triggerTab) {
                    var group = ['left', 'right'];

                    $.each(group, function(index, side) {
                        var filterExpr, left;

                        if (side === 'left')  {
                            filterExpr = ':lt(' + (triggerTab.index + 1) + ')';
                            left = 0;
                        } else {
                            filterExpr = ':gt(' + triggerTab.index + ')';
                            left = slideWidth;
                        }

                        slides
                            .filter(filterExpr)
                            .children('h2')
                            .each(function() {
                                var $this = $(this),
                                    tab = {
                                        elem : $this,
                                        index : header.index($this),
                                        next : $this.next(),
                                        prev : $this.parent().prev().children('h2'),
                                        pos : left
                                    };

                                // trigger item anim, pass original trigger context for callback fn
                                core.animSlide.call(tab, triggerTab);
                            });

                    });

                    // remove, then add selected class
                    header.removeClass('selected').filter(triggerTab.elem).addClass('selected');
                },

                ieClass : function(version) {
                    if (version < 7) methods.destroy();
                    if (version >= 10) return;
                    if (version === 7 || version === 8) {
                        slides.each(function(index) {
                            $(this).addClass('slide-' + index);
                        });
                    }

                    elem.addClass('ie ie' + version);
                },

                init : function() {
                    var ua = navigator.userAgent,
                        index = ua.indexOf('MSIE');

                    // test for ie
                    if (index !== -1) {
                        ua = ua.slice(index + 5, index + 7);
                        core.ieClass(+ua);
                    }

                    // init styles and events
                    core.setStyles();
                    core.bindEvents();

                    // check slide speed is not faster than cycle speed
                    if (settings.cycleSpeed < settings.slideSpeed) settings.cycleSpeed = settings.slideSpeed;

                    // init autoplay
                    settings.autoPlay && methods.play();
                }
            };

        // init plugin
        core.init();

        // expose methods
        return methods;

    };

    $.fn.accordionPro = function(method) {
        var elem = this,
            instance = elem.data('accordionPro');

        // if creating a new instance
        if (typeof method === 'object' || !method) {
            return elem.each(function() {
                var accordionPro;

                // if plugin already instantiated, return
                if (instance) return;

                // otherwise create a new instance
                accordionPro = new AccordionPro(elem, method);
                elem.data('accordionPro', accordionPro);
            });

        // otherwise, call method on current instance
        } else if (typeof method === 'string' && instance[method]) {
            // debug method isn't chainable b/c we need the debug object to be returned
            if (method === 'debug') {
                return instance[method].call(elem);
            } else { // the rest of the methods are chainable though
                instance[method].call(elem);
                return elem;
            }
        }
    };

})(jQuery);