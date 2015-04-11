export class HeaderController {
  constructor($scope, $filter, Search) {
    $scope.getSearch = function(val) {
      var r = Search.byComponent($scope.component,val);
      return r.$promise.then(data => {
        return data;
      });
    };
  }
}
