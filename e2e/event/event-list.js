'use strict';

describe('event.list', () => {
  var page;

  beforeEach(function () {
    browser.get('#/event/list');
  });
  
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
 
  it('it should have an fab button', function () {
    expect(element(by.css('.md-fab')).isPresent()).toBe(true);
  });

});

