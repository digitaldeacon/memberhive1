class Search {

  constructor($q, $filter, Person) {
    this.$q = $q;
    this.$filter = $filter;
    this.person = Person;

    this.models = ['all','person'];
  }

  findPerson(val) {
    console.log('searvhing: ' + val);
      this.person.find({
        where: { or:
          [{firstname: {like: '%'+val+'%'}},{lastname: {like: '%'+val+'%'}}]
        }
      }).$promise.then( (response) => {
        console.log(response);
      });
    return [];
  }
  byComponent(component,val) {
      var arr = [];
      if (component && this.models.indexOf(component)) {
        if (component === 'person') {
          arr = this.findPerson(val);
        }
      }
      console.log(val);
      console.log(component);
      console.log(arr);

      return arr;
  }
}
