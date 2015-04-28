export function HeaderController($scope, $state, $q, Search) {
  this.searchText = '';
  

  this.querySearch = (value) => {
    var promises = Search.byComponent(this.getComponent(), value);
    var results = [];
    return $q.all(promises).then(data => {
      data.map(item => {
        results = item;
      });
      return results.results;
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
  
  
  this.searchTextChange = (text) => {
    console.log('Text changed to ' + text);
  };
  this.selectedItemChange = (item) =>  {
    console.log('Item changed to ' + JSON.stringify(item));
  };
  
}
