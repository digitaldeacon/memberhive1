'use strict';

describe('list reports', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:9000/#/report/list');
  });

 
  it('fab button should redirect to report/create', function () {
    browser.findElement(by.css('.md-fab')).click();
    expect(browser.getCurrentUrl()).toContain("report/create");
  });

});
