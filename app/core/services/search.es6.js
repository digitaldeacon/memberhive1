class Search {

  constructor($q, $filter, Person) {
    this.$q = $q;
    this.$filter = $filter;
    this.Person = Person;

    this.models = ['all','person'];
    this.promises = [];
  }

  findPerson(val) {
    return this.Person.find({
      ignoreLoadingBar: true, // Don't block the UI
      filter: {
        where: {
          or: [
            {firstName: {like: `%${val}%`}},
            {middleName: {like: `%${val}%`}},
            {lastName: {like: `%${val}%`}}
          ]
        }}
      });
  }
  byComponent(component,val) {
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
