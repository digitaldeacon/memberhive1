export function HeaderController(
  $scope, 
  $state, 
  Search, 
  gettext, 
  LoopBackAuth,
  $mdMedia
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
  
   
  this.showSearch = $mdMedia('gt-md');
  this.showTitle = true;
  
  this.toogleSearch = () => {
    console.log(this.showSearch, $mdMedia('gt-md'));
    this.showSearch = !this.showSearch;
    if(this.showSearch) {
      this.showTitle = $mdMedia('gt-md');
    } else {
      this.showTitle = true;
    }
  };
  $scope.$watch(function() { return $mdMedia('gt-md'); }, (big) => {
    if(big) {
      this.showTitle = true;
    } else if(this.showSearch) {
      this.showTitle = false;
    }
  });
}
