    /**
     * PLUGIN HELPERS
     */

    /**
     * Convenience method for adding CSS rules to stylesheet
     * (One of the few instances where IE's syntax makes more sense!)
     */

    function addRule(selector, rules) {
      var sheet = document.styleSheets[document.styleSheets.length - 1];
      if (!sheet) return;

      try {
        if ('insertRule' in sheet) {
          sheet.insertRule(selector + '{' + rules + '}', (sheet.cssRules ? sheet.cssRules.length : 0));
        } else if ('addRule' in sheet) {
          sheet.addRule(selector, rules, (sheet.rules ? sheet.rules.length : 0));
        }
      } catch(e) {
        // addRule(selector, rules, index + 1);
      }
    }