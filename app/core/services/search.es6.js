class Search {

  constructor($q, $filter, Person) {
    this.$q = $q;
    this.$filter = $filter;
    this.person = Person;

    this.models = ['all','person'];
    this.promises = [];
  }

  findPerson(val) {
    return this.person.find({filter:
        {where: { or:
          [{firstname: {like: '%'+val+'%'}},{lastname: {like: '%'+val+'%'}}]
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
