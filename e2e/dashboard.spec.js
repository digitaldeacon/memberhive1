'use strict';

describe('test the dashboard', function () {
  var page;

  beforeEach(function () {
    browser.get('#/dashboard');
  });
  
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
 

});
