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
   * Init plugin
   */

  describe('Init plugin', function() {
    it('should have data', function() {
      elem.accordionPro();
      expect(elem).toHaveData('accordionPro');
    });

    // async!
    // it('should have imagesLoaded flag', function() {
    //   elem.accordionPro();
    //   expect(elem).toHaveData('accordionPro');
    // });


    it('should init plugin with data-options', function() {
      // expect(elem).toHaveClass('accordionPro');
    });

    it('should have scrollable panels', function() {

    });

    it('should have a tabSize set', function() {

    });

    it('should have a tabFontSize set', function() {

    });

    it('should have coloured tabs', function() {

    });


    // check selected slide


  });

});
