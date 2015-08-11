export function HeaderController(
  $scope, 
  $state, 
  Search, 
  gettext, 
  LoopBackAuth
) 
{
  "ngInject";

  this.searchText = '';
  this.selectedItem = null;
  this.personalMenu = [
    {name: gettext('Profile'), icon: 'person', link: 'person.view({id: "'+LoopBackAuth.currentUserId+'"})'},
    {name: gettext('Logout'), icon: 'logout', link: 'dashboard'}
  ];

  this.querySearch = (query) => {
    return Search.search(query).$promise.then((data) => {
      return data.data;
    });
  };

  this.selectedItemChange = (item) =>  {
    var id = this.selectedItem.id;
    this.selectedItem = null;
    this.searchText = '';
    $state.go('person.view', {id: id});
    
  };

}
