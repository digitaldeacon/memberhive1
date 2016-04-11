'use strict';
var tools = require('../tools');
describe('person.list', function () {
  var page;

  beforeEach(function () {
    browser.get('#/person/list');
  });
  afterEach(tools.noLogErrors);
  
  it('fab button should redirect to person/create', function () {
    browser.findElement(by.css('.md-fab')).click();
    expect(browser.getCurrentUrl()).toContain("person/create");
  });
  
 
});
