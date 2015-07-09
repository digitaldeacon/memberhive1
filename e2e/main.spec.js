'use strict';

describe('The Login page', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:9000/#/login');
  });

 
  it('Login Page', function () {
    var list = element.all(by.css('.form-title'));
    expect(list.count()).toBe(1);
  });

});
