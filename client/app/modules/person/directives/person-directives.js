
export function mhPersonChips(mhConfig, PersonService) {"ngInject";
  return {
    templateUrl: 'app/modules/person/templates/person-chips.html',
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
        return PersonService.search(query);
      };

    }
  };
}

export function mhPersonStatus() {
  return {
    templateUrl: 'app/modules/person/templates/person-status.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope, PersonService) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }
      $scope.searchStatus = (query) => {
        return PersonService.searchStatus(query);
      };
    }

  };
}
export function mhPersonTags() {
  return {
    templateUrl: 'app/modules/person/templates/person-tags.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope, PersonService) {"ngInject";
      $scope.searchTags = (query) => {
        return PersonService.searchTags(query);
      };
    }

  };
}

export function mhPersonListItem() {
  return {
    templateUrl: 'app/modules/person/templates/person-list-item.html',
    restrict: 'E',
    scope: {
      person: '=',
    },
    controller: function($scope) {"ngInject";
    }

  };
}

export function mhPersonEditType() {
  return {
    templateUrl: 'app/modules/person/templates/person-edit-type.html',
    restrict: 'E',
    scope: {
      key: '=',
      type: '@'
    },
    controller: function($scope, PersonService) {"ngInject";
      $scope.personService = PersonService;
    }

  };
}



