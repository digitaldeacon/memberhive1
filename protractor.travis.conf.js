'use strict';
exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  multiCapabilities: [
    {
      browserName : 'firefox',
      platform: 'Windows 8.1'
    },
    {
       browserName: 'chrome',
       platform: 'Windows 10'
    },
    {
      browserName: 'safari',
      version: '9',
      platform: 'mac os x 10.11'
    }
  
  ],


  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/**/*.js'],
  
  baseUrl : "http://localhost:9000/",

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  
  onPrepare: function() {
    browser.get('#/login');

    browser.findElement(by.model('loginCtrl.username')).sendKeys('root');
    browser.findElement(by.model('loginCtrl.password')).sendKeys('bibel');
    browser.findElement(by.css('.md-button')).click();

    // Login takes some time, so wait until it's done.
    return browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /dashboard/.test(url);
      });
    }, 10000);
  }
};