'use strict';

describe('menu', () => {
  var page;

  beforeEach(() => {
    browser.get('#/');

    element(by.id('mh-toogle-menu')).isDisplayed().then(isVisible => {
      if (isVisible)
        browser.findElement(by.id('mh-toogle-menu')).click();
    });
  });


  it('it should redirect to the dashboard', () => {
    browser.findElement(by.css('[ui-sref="dashboard"]')).click();
    expect(browser.getCurrentUrl()).toContain("dashboard");
  });

  it('it should redirect to the persons', () => {
    browser.findElement(by.css('[ui-sref="person.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("person/list");
  });


  it('it should redirect to the events', () => {
    browser.findElement(by.css('[ui-sref="event.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("event/list");
  });

  it('it should redirect to the notes', () => {
    browser.findElement(by.css('[ui-sref="note.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("note/list");
  });

  it('it should redirect to the groups', () => {
    browser.findElement(by.css('[ui-sref="group.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("group/list");
  });

  it('it should redirect to the groups', () => {
    browser.findElement(by.css('[ui-sref="settings.site"]')).click();
    expect(browser.getCurrentUrl()).toContain("settings/site");
  });

});


