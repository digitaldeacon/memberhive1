'use strict';
var tools = require('../tools');

describe('event.list', () => {
  var page;

  beforeEach(function () {
    browser.get('#/event/list');
  });
  
  afterEach(tools.noLogErrors);
 
  it('it should have an fab button', function () {
    expect(element(by.css('.md-fab')).isPresent()).toBe(true);
  });

});

