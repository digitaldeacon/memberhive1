'use strict';

exports.noLogErrors = () => {
   browser.manage().logs().get('browser').then((browserLog) => {
      let i = 0;
      let severWarnings = false;

      for(i; i < browserLog.length; i++){
        if(browserLog[i].level.name === 'SEVERE'){
          console.log('(Possibly exception) \n' + browserLog[i].message);
          severWarnings = true;
        }
      }
      expect(severWarnings).toBe(false);
    });
};
