export function GroupViewController(
  GroupService, 
  resolveGroup,
  resolvePersons,
  Group,
  Person,
  Shout,
  $state
) {"ngInject";
  this.group = resolveGroup;
  this.persons = resolvePersons;
 
  this.deletePerson = (person) => {
    Person.groups.unlink({id: person.id, fk: this.group.id}).$promise
      .then((d) => Shout.success(person.firstName + " deleted"));
      this.persons = Group.persons({id: this.group.id}).$promise;
  };
}
