export class Search {

  constructor(Person) {
    this.Person = Person;

    this.models = ['all', 'person'];
  }

  findPerson(val) {
    return this.Person.search({
      value: val
    });
  }

  byComponent(component, val) {
    switch (component) {
      case 'person':
        return this.findPerson(val);
      default:
        return this.findPerson(val);
    }
  }
}
