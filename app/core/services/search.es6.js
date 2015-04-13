class Search {

  constructor($q, $filter, Person) {
    this.$q = $q;
    this.$filter = $filter;
    this.person = Person;

    this.models = ['all','person'];
    this.promises = [];
  }

  findPerson(val) {
    return this.person.find({
      filter: {
        limit: 20,
        where: {
            or: [
              {firstName: {like: '%'+val+'%'}},{lastName: {like: '%'+val+'%'}},
              {nickName: {like: '%'+val+'%'}},{middleName: {like: '%'+val+'%'}},
              {prefix: {like: '%'+val+'%'}},{suffix: {like: '%'+val+'%'}}
              //{'contacts.value': {like: '%'+val+'%'}}
            ]
        },
        //include: ['contacts']
      }
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
