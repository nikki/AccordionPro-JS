    /**
     * PLUGIN HELPERS
     */

    /**
     * Finds the accordion stylesheet
     */

    (function findStyleSheet() {
      var sheets = document.styleSheets,
          safeList = [];

      for (var i in sheets) { // stylesheet must be on same domain
        if (sheets[i].href && sheets[i].href.indexOf(window.location.origin) >= 0) {
          // list of same origin stylesheets
          safeList.push(i);

          // find accordion stylesheet
          if (sheets[i].href.indexOf('accordionpro') >= 0) {
            sheet = sheets[i];
            return;
          }
        }
      }

      if (!sheet) { // can't find the accordion stylesheet?
        // get the first from the safe list
        sheet = sheets[safeList.pop()];
      }
    })();


    /**
     * Convenience method for adding CSS rules to stylesheet
     * (One of the few instances where IE's syntax makes more sense!)
     */

    function addRule(selector, rules) {
      if (!sheet) return;

      if ('insertRule' in sheet) {
        sheet.insertRule(selector + '{' + rules + '}', (sheet.cssRules ? sheet.cssRules.length : 0));
      } else if ('addRule' in sheet) {
        sheet.addRule(selector, rules, (sheet.rules ? sheet.rules.length : 0));
      }
    }