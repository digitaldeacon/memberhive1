'use strict';
var tools = require('../tools');
describe('person.create', function () {
  var page;

  beforeEach(function () {
    browser.get('#/person/create');
  });
  afterEach(tools.noLogErrors);
  
  it('it should create an person', function () {
    element(by.model('personCtrl.person.firstName')).sendKeys('First Name');
    element(by.model('personCtrl.person.lastName')).sendKeys('Last Name');
    element(by.id('mh-person-edit-save')).click();
    expect(browser.getCurrentUrl()).toContain("person/edit");
  });
  
 
});
