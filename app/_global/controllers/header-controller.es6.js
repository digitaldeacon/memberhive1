export class HeaderController {
  constructor($scope, $state, $q, Search) {
    $scope.getSearch = function(val) {
      var promises = Search.byComponent($scope.component,val);
      var results = [];
      return $q.all(promises).then(data => {
        data.map(item => {
          results = item;
        });
        console.log(results);
        return results;
      });
    };

    $scope.component = $state.current.data.component;
    $scope.$on('$stateChangeSuccess', () => {
      $scope.component = $state.current.data.component;
    });

  }
}
