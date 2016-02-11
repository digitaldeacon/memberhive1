export function Search(Person, Group, $q) {"ngInject";

  this.search = (query, which) => {
    which = which || ['person', 'group'];
    let promises = [];
    if(_.contains(which, 'person')) {
      promises.push(this.personSeach(query));
    }
    if(_.contains(which, 'group')) {
      promises.push(this.groupSeach(query));
    }
    return $q.all(promises);
  };

  this.personSearch = (query) => {
    return Person.search({query: query}).$promise
      .then((data) => data.map(this.genPerson));
  };

  this.genPerson = (data) => {
    return {
      icon: "",
      name: data.firstName + " " + data.lastName,
      viewAction: "",
      id: data.id,
      type: "person"
    };
  };

  this.genGroup = (data) => {
    return {
      icon: "",
      name: data.name,
      viewAction: "",
      id: data.id,
      type: "person"
    };
  };


  this.groupSearch = (query) => {
    return Group.find({
        filter: {
          where: {name: {like: query}}
        }
      }).$promise
      .then((data) => data.map(this.genGroup));
  };
}
