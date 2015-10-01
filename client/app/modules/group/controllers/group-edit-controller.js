export function GroupEditController(
  GroupService, 
  resolveGroup,
  Shout,
  $state
) {"ngInject";
  this.group = resolveGroup;

  this.save = () => {
    GroupService.save(this.group)
      .then(() => Shout.success("Group saved"),
            (err) => Shout.vError(err));
  };
  
  this.close = () => {
    $state.go('group.list');
  };
}
