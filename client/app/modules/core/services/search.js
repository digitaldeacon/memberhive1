export class Search {

  constructor(Person,Tag) {
    this.Person = Person;
    this.Tag = Tag;

    this.models = ['all','person','tag'];
    this.promises = [];
  }

  findPerson(val) {
    return this.Person.search({
      ignoreLoadingBar: true, // Don't block the UI
      value: val
    });
  }

  findTagEntity(val) {
    return this.Tag.search({
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
      case 'tag':
        this.promises.push(this.findTagEntity(val).$promise);
        break;
      default:
        this.promises.push(this.findPerson(val).$promise);
        this.promises.push(this.findTagEntity(val).$promise);
    }
    return this.promises;
  }
}
