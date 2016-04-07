'use strict';

describe('menu', () => {
  var page;

  beforeEach(() => {
    browser.get('#/');
    browser.driver.sleep(1000);
  });

 
  xit('it should redirect to the dashboard', () => {
    browser.findElement(by.css('[ui-sref="dashboard"]')).click();
    expect(browser.getCurrentUrl()).toContain("dashboard");
  });
  
  xit('it should redirect to the persons', () => {
    browser.findElement(by.css('[ui-sref="person.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("person/list");
  });
  
    
  xit('it should redirect to the events', () => {
    browser.findElement(by.css('[ui-sref="event.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("event/list");
  });
  
  xit('it should redirect to the notes', () => {
    browser.findElement(by.css('[ui-sref="note.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("note/list");
  });
  
  xit('it should redirect to the groups', () => {
    browser.findElement(by.css('[ui-sref="group.list"]')).click();
    expect(browser.getCurrentUrl()).toContain("group/list");
  });

});


