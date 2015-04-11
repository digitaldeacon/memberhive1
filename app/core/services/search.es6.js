class Search {

  constructor($q, $filter, Person) {
    this.$q = $q;
    this.$filter = $filter;
    this.person = Person;

    this.models = ['all','person'];
  }

  findPerson(val) {
    return this.person.find({filter:
        {where: { or:
          [{firstname: {like: '%'+val+'%'}},{lastname: {like: '%'+val+'%'}}]
        }}
      });
  }
  byComponent(component,val) {
      var r = null;
      if (component && this.models.indexOf(component)) {
        if (component === 'person') {
          return this.findPerson(val);
        }
      }
      return r;
  }
}
