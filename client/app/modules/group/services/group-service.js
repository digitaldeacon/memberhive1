export function GroupService(Group) {
  this.all = () => {
    return Group.find().$promise;
  };
  
  this.new = () => {
    return new Group();
  };
  
  this.get = (groupId) => {
    return Group.findById({id: groupId}).$promise;
  };
  
  this.save = (group) => {
    return Group.upsert({}, group).$promise;
  };
  
  this.search = (query) => {
    return Group.find({
        filter: {
          where: {name: {like: query}}
        }
      }).$promise.then((data)=> console.log(data));
  };
}
