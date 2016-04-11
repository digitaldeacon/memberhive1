'use strict';

describe('person.create', function () {
  var page;

  beforeEach(function () {
    browser.get('#/person/create');
  });

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
  
  it('it should create an person', function () {
    element(by.model("personCtrl.person.firstName")).sendKeys('First Name');
    element(by.model("personCtrl.person.lastName")).sendKeys('Last Name');
    browser.findElement(by.css('mh-person-edit-save')).click();
    expect(browser.getCurrentUrl()).toContain("person/create");
  });
  
 
});
