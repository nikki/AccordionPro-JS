jasmine.getFixtures().fixturesPath = 'test/fixtures/';
jasmine.getStyleFixtures().fixturesPath = './';

describe('Setup', function() {
  var elem;

  beforeEach(function() {
    loadStyleFixtures('css/accordionpro.css');
    loadFixtures('default.html');
    elem = $('#accordion');
  });


  /**
   * setPluginClasses
   */

  describe('setPluginClasses', function() {
    // set default classname
    it('should have the class "accordionPro"', function() {
      elem.accordionPro();
      expect(elem).toHaveClass('accordionPro');
    });

    // set orientation classname
    it('should have the class "vertical"', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem).toHaveClass('vertical');
    });

    // theme
    it('should have the class "stitch"', function() {
      elem.accordionPro({ theme : 'stitch' });
      expect(elem).toHaveClass('stitch');
    });

    // another theme
    it('shiuld have the class "bordered"', function() {
      elem.accordionPro({ theme : 'bordered' });
      expect(elem).toHaveClass('bordered');
    });

    // colour scheme
    it('should not have a colour scheme style', function() {
      elem.accordionPro({ theme : 'bordered' });
      expect(elem).not.toHaveClass('flat');
    });

    // colour style
    it('should have a colour scheme', function() {
      elem.accordionPro({ theme : 'bordered', colour : { scheme : 'dark-blue' } });
      expect(elem).toHaveClass('scheme-dark-blue');
      expect(elem).toHaveClass('style-flat');
    });

    // colour style
    it('should have a colour scheme and a gradient style', function() {
      elem.accordionPro({ theme : 'bordered', colour : { scheme : 'blue', style : 'gradient' } });
      expect(elem).toHaveClass('scheme-blue');
      expect(elem).toHaveClass('style-gradient');
    });

    // rounded
    it('should have the class "rounded"', function() {
      elem.accordionPro({ rounded : true });
      expect(elem).toHaveClass('rounded');
    });

    // rtl
    it('should have the class "rtl"', function() {
      elem.accordionPro({ rtl : true });
      expect(elem).toHaveClass('rtl');
    });

    // start closed
    it('should have the class "closed"', function() {
      elem.accordionPro({ startClosed : true });
      expect(elem).toHaveClass('closed');
    });

    // fitToContent
    it('should have the class "fitToContent"', function() {
      elem.accordionPro({ orientation : 'vertical', verticalSlideHeight : 'fitToContent' });
      expect(elem).toHaveClass('fitToContent');
    });

    // scrollable
    it('should have the class "scrollable"', function() {
      elem.accordionPro({ panel : { scrollable : true } });
      expect(elem).toHaveClass('scrollable');
    });

    // scale images
    it('should have the class "scaleImages"', function() {
      elem.accordionPro({ panel : { scaleImages : true } });
      expect(elem).toHaveClass('scaleImages');
    });
  });


  /**
   * setSlideClasses
   */

  describe('setSlideClasses', function() {
    it('should have a slide class', function() {
      elem.accordionPro();
      expect(elem.children().children().eq(2)).toHaveClass('slide');
    });

    it('should have the class "slide-3"', function() {
      elem.accordionPro();
      expect(elem.children().children(':nth-child(3)')).toHaveClass('slide-3');
    });

    it('should have data-slide-name = accordion-slide-4"', function() {
      elem.accordionPro();
      expect(elem.children().children(':nth-child(4)')).toHaveData('slide-name', 'accordion-slide-4');
    });
  });


  /**
   * setTabClasses
   */

  describe('setTabClasses', function() {
    // tab icon
    it('should have the classname "chevron"', function() {
      elem.accordionPro({ tab : { icon : 'chevron' } });
      expect(elem.find('.slide:eq(0)').children(':eq(0)')).toHaveClass('chevron');
    });

    // alternate text orientation
    it('should have the classname "alt-text-orientation"', function() {
      elem.accordionPro({ tab : { textOrientation : 'vertical' } });
      expect(elem.find('.slide:eq(2)').children(':eq(0)')).toHaveClass('alt-text-orientation');
    });

    // (not) alternate text orientation
    it('should *not* have the classname "alt-text-orientation"', function() {
      elem.accordionPro({ tab : { textOrientation : 'normal' } });
      expect(elem.find('.slide:eq(2)').children(':eq(0)')).not.toHaveClass('alt-text-orientation');
    });
  });


  /**
   * setPluginDimensions
   */

  describe('setPluginDimensions', function() {
    it('should have default horizontal width', function() {
      elem.accordionPro();
      expect(elem.width()).toEqual(900);
    });

    it('should have default horizontal height', function() {
      elem.accordionPro();
      expect(elem.height()).toEqual(300);
    });

    it('should have default vertical width', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem[0].style.width).toEqual('100%');
    });

    it('should have default vertical height', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem.height()).toEqual(500);
    });
  });


  /**
   * setSlideDimensions
   */

  describe('setSlideDimensions', function() {
    it('should be 440px wide', function() {
      var numSlides = (elem.children().children()).length,
          tabWidth = 40,
          tabsWidth = (numSlides - 1) * tabWidth;

      elem.accordionPro({ horizontalWidth : 600, tab : { size : tabWidth }});
      expect(elem.find('.slide:eq(2)').width()).toEqual(600 - tabsWidth);
    });


    // horz height

    // slide 5 position left

    it('should be 400px wide', function() {
      elem.accordionPro({ orientation : 'vertical', verticalWidth : 400 });
      expect(elem.find('.slide:eq(4)').width()).toEqual(400);
    });

    // vert height

    // slide 3 position top
  });


  /**
   * setTabDimensions
   */

  describe('setTabDimensions', function() {
    // horizontal width
    it('should be 300px wide', function() {
      elem.accordionPro();
      expect(elem.find('.slide:eq(0)').children(':first-child').width()).toEqual(300);
    });

    // vertical width
    it('should be 100% width', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem.find('.slide:eq(0)').children(':first-child').width()).toEqual(elem.width());
    });

    // default height
    it('should be 48px tall', function() {
      elem.accordionPro();
      expect(elem.find('.slide:eq(0)').children(':first-child').height()).toEqual(48);
    });

    // user set height
    it('should be 60px tall', function() {
      elem.accordionPro({ tab : { size : 60 } });
      expect(elem.find('.slide:eq(0)').children(':first-child').height()).toEqual(60);
    });

    // user set font size
    it('should have font-size 48px', function() {
      elem.accordionPro({ tab : { fontSize : 48 } });
      expect(elem.find('.slide:eq(0)').children(':first-child')).toHaveCss({ 'font-size' : '48px' });
    });

    // user set font family
    it('should have Courier font family', function() {
      elem.accordionPro({ tab : { font : 'Courier' } });
      expect(elem.find('.slide:eq(0)').children(':first-child')).toHaveCss({ 'font-family' : 'Courier' });
    });
  });


  /**
   * setPanelDimensions
   */

/*
  describe('setPanelDimensions', function() {
    it('should be x px wide', function() {

    });

    it('should be x px high', function() {

    });

    it('should have position:left x px', function() {

    });

    it('should have position:top x px', function() {

    });
  });
*/


  /**
   * setCustomTabImages
   */

/*
  describe('setCustomTabImages', function() {
    it('should use one image for all tabs', function() {

    });

    it('should use a different image for each tab', function() {

    });
  });
*/


  /**
   * setClosedPluginDimensions
   */

/*
  describe('setClosedPluginDimensions', function() {
    it('should have a width of x', function() {

    });
  });
*/


  /**
   * setPluginVisible
   */

  describe('setPluginVisible', function() {
    it('should make elem visible', function() {
      elem.accordionPro();
      expect(elem).toBeVisible();
    });
  });


  /**
   * internetExplo(d|r)er
   */

/*
  describe('internetExplo(d|r)er', function() {
    it('isn\'t IE, so skip IE support', function() {
      elem.accordionPro();
      // console.log(navigator.userAgent);
    });

    it('should throw an error on IE7', function() {
      elem.accordionPro();
      // console.log(navigator.userAgent);
    });

    it('should patch up IE8', function() {
      elem.accordionPro();
      // console.log(navigator.userAgent);
    });

    it('should skip IE support when IE version >= 9', function() {
      elem.accordionPro();
      // console.log(navigator.userAgent);
    });
  });
*/


});