'use strict';

describe('creating reports', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:9000/#/report/create');

  });

 
  xit('it should have an save button', function () {
    var list = element.all(by.css('[ng-click="reportUpCtrl.saveReport()"]'));
    expect(list.count()).toBe(1);
  });

});
