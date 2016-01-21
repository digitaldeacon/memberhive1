export function HeaderController(
  $scope, 
  $state, 
  Search, 
  gettext, 
  LoopBackAuth,
  $mdMedia,
  Account,
  AvatarService,
  MhAcl
) 
{
  "ngInject";

  this.searchText = '';
  this.selectedItem = null;
  this.personalMenu = [
    {name: gettext('Profile'), icon: 'person', link: 'person.view({id: "'+LoopBackAuth.currentUserId+'"})'},
  ];

  this.querySearch = (query) => {
    return Search.search(query).$promise.then((data) => {
      return data.data;
    });
  };

  this.selectedItemChange = (item) =>  {
    if(!item) return;
    var id = this.selectedItem.id;
    this.selectedItem = null;
    this.searchText = '';
    $state.go('person.view', {id: id});
    
  };
  
   
  this.showSearch = $mdMedia('gt-md'); // show searchbar only when screen is large
  this.showTitle = true; //always show title at start
  
  this.toogleSearch = () => {
    this.showSearch = !this.showSearch;//toggle
    if(this.showSearch) {
      this.showTitle = $mdMedia('gt-md'); //show title only if screen is big
    } else {
      this.showTitle = true; // when there is not search alway show title
    }
  };
  $scope.$watch(function() { return $mdMedia('gt-md'); }, (big) => {
    if(big) {
      this.showTitle = true;//if the screen was resized to big then show title
    } else if(!big && this.showSearch) {
      this.showTitle = false; // if the screen was resized to small and search is visible then hide title
    }
  });
  this.logout = () => {
    Account.logout().$promise.then((resp) => {
      MhAcl.setRights([]);
      $state.go('login');
    });
  };
  
  this.avatarUrl = (person) => {
    return AvatarService.getAvatarUrl(person, 'xs');
  };
}
