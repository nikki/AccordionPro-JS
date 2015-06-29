    /**
     * PLUGIN HELPERS
     */

    function addRule(selector, rules) {
      var sheet = document.styleSheets[0];

      if (!sheet) return;
      if ('insertRule' in sheet) {
        sheet.insertRule(selector + '{' + rules + '}', sheet.cssRules.length);
        console.log(sheet.cssRules.length)
      } else if ('addRule' in sheet) {
        console.log(sheet.rules.length);
        sheet.addRule(selector, rules, sheet.rules.length);
      }
    }

