
export function mhGroupChips(GroupService) {"ngInject";
  return {
    templateUrl: 'app/modules/group/templates/group-chips.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    link: function(scope, element, attrs) {
      if(!scope.ngModel) {
        scope.ngModel= [];
      }
      scope.filterSelected = true;
      scope.querySearch = (query) => {
        var ret = GroupService.search(query);
        return ret;
      };
    }
  };
}





