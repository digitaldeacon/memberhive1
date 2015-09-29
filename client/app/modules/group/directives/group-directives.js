
export function mhGroupChips(GroupService) {"ngInject";
  return {
    templateUrl: 'app/modules/group/templates/group-chips.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    link: function(scope, element, attrs) {
      console.log(scope.ngModel);
      if(!scope.ngModel) {
        scope.ngModel= [];
      }
      console.log("after", scope.ngModel);
      scope.filterSelected = true;
      scope.querySearch = (query) => {
        return GroupService.search(query);
      };
    }
  };
}





