'use strict';

describe('creating reports', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:9000/#/report/create');

  });

 
  it('it should have an save button', function () {
    expect(element(by.css('[ng-click="reportUpCtrl.saveReport()"]')).isPresent()).toBe(true);
  });

});
