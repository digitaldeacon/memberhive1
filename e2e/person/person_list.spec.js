'use strict';

describe('person.list', function () {
  var page;

  beforeEach(function () {
    browser.get('#/person/list');
  });

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
  
  it('fab button should redirect to person/create', function () {
    browser.findElement(by.css('.md-fab')).click();
    expect(browser.getCurrentUrl()).toContain("person/create");
  });
  
 
});
