export function mhPersonSearch() {
  return {
    templateUrl: 'app/modules/person/templates/person-search.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope) {"ngInject";
      $scope.queryModel = [];
      $scope.selectedItem = null;
      $scope.searchText = "";

      this.logicBlocks = [
        {name: "AND", type: "logic"},
        {name: "OR", type: "logic"},
        {name: "NOT", type: "logic"}
      ];

      this.queryBlocks = [
        {"name": "Status", "type": "query"},
        {"name": "Name", "type": "query"},
        {"name": "Nachname", "type": "query"},
        {"name": "Vorname", "type": "query"},
        {"name": "Tag", "type": "query"}
      ];


      $scope.querySearch = (query) => {
        let v = _.concat(this.logicBlocks, this.queryBlocks);
        return _.filter(v, x => _.startsWith(x.name, query));
      };

      $scope.transformChip = (chip) => {
        return chip;
      };
    }

  };
}
