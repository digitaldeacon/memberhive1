export class HeaderController {
  constructor($scope, $filter, Search) {
    $scope.getSearch = function(val) {
      var arr = Search.byComponent($scope.component,val);
      return $filter('filter')(arr,val);
    };
  }
}
