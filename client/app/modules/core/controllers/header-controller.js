export function HeaderController($scope, $state, Search, gettext, LoopBackAuth) {

  this.searchText = '';

  this.personalMenu = [
    {name: gettext('Profile'), icon: 'person', link: 'person.view({id: "'+LoopBackAuth.currentUserId+'"})'},
    {name: gettext('Logout'), icon: 'logout', link: ''}
  ];

  this.querySearch = (value) => {
    return Search.byComponent(this.getComponent(), value).$promise.then((data) => {
      return data.results;
    });
  };

  this.getComponent = () => {
    if ($state.current.hasOwnProperty('data'))
      return $state.current.data.component;
    return 'all';
  };

  $scope.component = this.getComponent();

  $scope.$on('$stateChangeSuccess', () => {
    $scope.component = this.getComponent();
  });

  this.selectedItemChange = (item) =>  {
    $state.go('person.view', {id: item.id});
  };

}
