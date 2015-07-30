export function Search(Person) {
  this.search = (query) => {
    return Person.search({query: query});
  };
}
