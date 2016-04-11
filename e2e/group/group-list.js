'use strict';

describe('group.list', () => {
  var page;

  beforeEach(() => {
    browser.get('#/group/list');
  });
  
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
    });
  });
 
  it('it should have an fab button', () => {
    expect(element(by.css('.md-fab')).isPresent()).toBe(true);
  });
  
  it('fab button should redirect to person/create', () => {
    browser.findElement(by.css('.md-fab')).click();
    expect(browser.getCurrentUrl()).toContain("group/create");
  });

});

