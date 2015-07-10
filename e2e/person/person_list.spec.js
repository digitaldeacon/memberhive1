'use strict';

describe('list reports', function () {
  var page;

  beforeEach(function () {
    browser.get('#/person/list');
  });

 
  it('fab button should redirect to person/create', function () {
    browser.findElement(by.css('.md-fab')).click();
    expect(browser.getCurrentUrl()).toContain("person/create");
  });

});
