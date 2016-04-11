'use strict';
var tools = require('./tools');

describe('test the dashboard', function () {
  var page;

  afterEach(tools.noLogErrors);
  
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
 

});
