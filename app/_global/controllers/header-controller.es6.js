export class HeaderController {
  constructor($scope, $state, $q, Search) {
    this.term = '';

    $scope.getSearch = function(val) {
      var promises = Search.byComponent($scope.component,val);
      var results = [];
      return $q.all(promises).then(data => {
        data.map(item => {
          results = item;
        });
        return results.results;
      });
    };

    $scope.component = $state.current.data.component;
    $scope.$on('$stateChangeSuccess', () => {
      $scope.component = $state.current.data.component;
    });

  }
}
