export function GroupViewController(
  GroupService, 
  resolveGroup,
  resolvePersons,
  resolveLeaders,
  Group,
  Person,
  Shout,
  $state
) {"ngInject";
  this.group = resolveGroup;
  this.persons = resolvePersons;
  this.leaders = resolveLeaders;
  
  this.deletePerson = (person) => {
    Person.groups.unlink({id: person.id, fk: this.group.id}).$promise
      .then((d) => {
        Shout.success(person.firstName + " deleted");
        this.persons = Group.persons({id: this.group.id}).$promise;
      });
  };
  
  this.isLeader = (person) => {
    console.log(_.contains(this.leaders, person));
    return _.contains(this.leaders, person);
  };
  
  this.makeLeader = (person) => {
    Person.leadingGroups.link({id: person.id, fk: this.group.id}).$promise
      .then((d) => {
        Shout.success(person.firstName + " is a leader");
        this.leaders = Group.leaders({id: this.group.id}).$promise;
      });
  };
  
  this.unMakeLeader = (person) => {
    Person.leadingGroups.unlink({id: person.id, fk: this.group.id}).$promise
      .then((d) => {
        Shout.success(person.firstName + " is not a leader anymore");
        this.leaders = Group.leaders({id: this.group.id}).$promise;
      });
  };
}
