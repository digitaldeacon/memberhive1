export function GroupViewController(
  GroupService, 
  resolveGroup,
  resolvePersons,
  Shout,
  $state
) {"ngInject";
  this.group = resolveGroup;
  this.persons = resolvePersons;
 
}
