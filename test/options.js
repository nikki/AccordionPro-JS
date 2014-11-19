jasmine.getFixtures().fixturesPath = 'test/fixtures/';
jasmine.getStyleFixtures().fixturesPath = './';

describe('Options', function() {
  var elem;

  beforeEach(function() {
    loadStyleFixtures('css/accordionpro.css');
    loadFixtures('options.html');
    elem = $('#accordion');
  });


  /**
   * Init plugin with options
   */

  describe('Init plugin with options', function() {
    it('should init plugin with data-options', function() {
      expect(elem).toHaveClass('accordionPro');
    });

    it('should have scrollable panels', function() {

    });

    it('should have a tabSize set', function() {

    });

    it('should have a tabFontSize set', function() {

    });

    it('should have coloured tabs', function() {

    });




  });

});
