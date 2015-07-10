'use strict';

describe('test the dashboard', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:9000/#/dashboard');
  });

 
  xit('it should have a edit button', function () {
    expect(element(by.css('[ng-click="toggleEditMode()"]')).isPresent()).toBe(true);
  });

});
