export function Search(Person) {"ngInject";
  this.search = (query) => {
    return Person.search({query: query});
  };
}
