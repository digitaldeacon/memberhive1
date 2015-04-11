export class HeaderController {
  constructor($scope, $state, $q, Search) {
    $scope.getSearch = function(val) {
      var promises = Search.byComponent($scope.component,val);
      var results = [];
      return $q.all(promises).then(data => {
        data.map(item => {
          results = item;
        });
        return results;
      });
    };

    $scope.$on('$stateChangeSuccess', function updatePage() {
      $scope.component = $state.current.data.component;
    });

  }
}
