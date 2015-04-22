export class Search {

  constructor(Person) {
    this.Person = Person;

    this.models = ['all','person'];
    this.promises = [];
  }

  findPerson(val) {
    return this.Person.search({
      ignoreLoadingBar: true, // Don't block the UI
      value: val
    });
  }

  byComponent(component, val) {
    console.log(component);
    switch (component) {
      case 'person':
        this.promises.push(this.findPerson(val).$promise);
        break;
      default:
        this.promises.push(this.findPerson(val).$promise);
    }
    return this.promises;
  }
}
