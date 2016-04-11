'use strict';

exports.noLogErrors = () => {
   browser.manage().logs().get('browser').then((browserLog) => {
      let i = 0;
      let severWarnings = false;

      for(i; i < browserLog.length; i++){
        if(browserLog[i].level.name === 'SEVERE' 
          && !browserLog[i].message.includes("WebSocket connection to")
          && !browserLog[i].message.includes("http://127.0.0.1:3994/api/Accounts 0:0 Failed to load resource: the server responded with a status of 401 (Unauthorized)")
          && !browserLog[i].message.includes("http://127.0.0.1:3994/api/Accounts/roles 0:0 Failed to load resource: the server responded with a status of 401 (Unauthorized)")
        ){
          console.log('(Possibly exception) \n' + browserLog[i].message);
          severWarnings = true;
        }
      }
      expect(severWarnings).toBe(false);
    });
};
