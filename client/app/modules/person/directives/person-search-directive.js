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
      
      this.currentBlockType = () => {
        if($scope.queryModel.length === 0) return "empty";
        return _.last($scope.queryModel).type;
      };
      
      this.currentBlock = () => {
        if($scope.queryModel.length === 0) return {};
        return _.last($scope.queryModel);
      };
      
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
        let currentBlockType = this.currentBlockType();
        console.log("current block type", currentBlockType);
        if(currentBlockType === "empty" || currentBlockType === "logic") {
          return $scope.searchQueryBlocks(query);
        } else if(currentBlockType === "query") {
          return $scope.searchQuery(this.currentBlock().name, query);
        } else if(currentBlockType === "value") {
          return $scope.searchLogicBlocks(query);
        }
        return [];
      };
      
      $scope.searchQueryBlocks = (query) => {
        console.log("query query blocks");
         return _.filter(
                  this.queryBlocks, 
                  x => _.startsWith(x.name, query)
                );
      };
       $scope.searchLogicBlocks = (query) => {
         console.log("query logic blocks");
          return _.filter(
                  this.logicBlocks, 
                  x => _.startsWith(x.name, query));
      };
      $scope.searchQuery = (field, query) => {
         console.log("query logic blocks");
         return [{"name": "Value", "type": "value"}];
      };
      this.order = 0;
      $scope.transformChip = (chip) => {
        let newChip = {};
        angular.copy(chip, newChip);
        newChip.order = this.order;
        this.order++;
        return newChip;
      };
      
       
    }

  };
}
