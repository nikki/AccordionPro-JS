jasmine.getFixtures().fixturesPath = 'test/';
jasmine.getStyleFixtures().fixturesPath = './';

describe('Setup', function() {
  var elem;

  beforeEach(function() {
    loadStyleFixtures('css/accordionpro.css');
    loadFixtures('fixture.html');
    elem = $('#accordion');
  });


  /**
   * :setGlobalClasses
   */

  describe(':setGlobalClasses', function() {
    it('should have data', function() {
      elem.accordionPro();
      expect(elem).toHaveData('accordionPro');
    });

    it('should have the class "accordionPro"', function() {
      elem.accordionPro();
      expect(elem).toHaveClass('accordionPro');
    });

    it('should have the class "vertical"', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem).toHaveClass('vertical');
    });

    it('should have the class "stitch"', function() {
      elem.accordionPro({ theme : 'stitch' });
      expect(elem).toHaveClass('stitch');
    });

    it('should have the class "rounded"', function() {
      elem.accordionPro({ rounded : true });
      expect(elem).toHaveClass('rounded');
    });

    it('should gruhave the class "rtl"', function() {
      elem.accordionPro({ rtl : true });
      expect(elem).toHaveClass('rtl');
    });

    it('should have the class "startClosed"', function() {
      elem.accordionPro({ startClosed : true });
      expect(elem).toHaveClass('closed');
    });

    it('should have the class "fitToContent"', function() {
      elem.accordionPro({ orientation : 'vertical', verticalSlideHeight : 'fitToContent' });
      expect(elem).toHaveClass('fitToContent');
    });

    it('should *not* have the class "scaleImages"', function() {
      elem.accordionPro({ scaleImages : false });
      expect(elem).not.toHaveClass('scaleImages');
    });
  });


  /**
   * :setGlobalDimensions
   */

  describe(':setGlobalDimensions', function() {
    it('should have default horizontal width', function() {
      elem.accordionPro();
      expect(elem.width()).toBe(900);
    });

    it('should have default horizontal height', function() {
      elem.accordionPro();
      expect(elem.height()).toBe(300);
    });

    it('should have default vertical width', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem[0].style.width).toBe('100%');
    });

    it('should have default vertical height', function() {
      elem.accordionPro({ orientation : 'vertical' });
      expect(elem.height()).toBe(500);
    });
  });

  /**
   * :calcBoxDimensions
   */

  describe(':calcBoxDimensions', function() {

  });


  /**
   * :setSlideClasses
   */

  describe(':setSlideClasses', function() {
    it('should have a slide class', function() {
      elem.accordionPro();
      expect(elem.children().children().eq(2)).toHaveClass('slide');
    });

    it('should have the class "slide-3"', function() {
      elem.accordionPro();
      expect(elem.children().children().eq(3)).toHaveClass('slide-3');
    });
  });


  /**
   * :setSlideDimensions
   */

  describe(':setSlideDimensions', function() {

  });


  /**
   * :setSlidePositions
   */

  describe(':setSlidePositions', function() {

  });


  /**
   * :internetExploder
   */

/*
  describe(':internetExploder', function() {
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

  /**
   * :events
   */

  describe(':events', function() {

  });

});