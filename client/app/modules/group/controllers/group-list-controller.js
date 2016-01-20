export function GroupListController(
  GroupService,
  resolveGroups,
  Shout,
  Group
) {"ngInject";
  this.groups = resolveGroups;

  this.deleteGroup = (group) => {
    Group.deleteById({id: group.id}).then((data) => {
      Shout.success("Group deleted");
      this.groups = GroupService.all();
    });
  };
}
