'use strict';
var tools = require('../tools');

describe('settings.site', () => {
  var page;

  beforeEach(function () {
    browser.get('#/settings/site');
  });

  afterEach(tools.noLogErrors);
});

