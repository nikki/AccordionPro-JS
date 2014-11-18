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
   * Test instantiating plugin with different settings
   */

  describe('Plugin instantiation', function() {
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
  });
});