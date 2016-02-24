export function utcDate() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var toView = function(val) {
        console.log("to view", val);
        return val;
      };

      var toModel = function(val) {
        console.log("to model", val);
        var offset = moment(val).utcOffset();
        var date = new Date(moment(val).add(offset, 'm'));
        console.log("to model return", date);
        return date;
      };

      ngModel.$formatters.unshift(toView);
      ngModel.$parsers.unshift(toModel);
    }
  };
}

export function mhDateInput() {"ngInject";
  return {
    template: '<md-datepicker ng-model="ngModel" md-placeholder="{{placeholder}}"></md-datepicker>',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: ($scope) => {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = new Date();
      } else {
        if(!angular.isDate($scope.ngModel)) {
          $scope.ngModel = moment($scope.ngModel).toDate();
        }
      }
    }
  };
}

export function mhUtcDateInput() {"ngInject";
  return {
    template: '<md-datepicker ng-model="ngModel" md-placeholder="{{placeholder}}" utc-date></md-datepicker>',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: ($scope) => {"ngInject";
      console.log("utc date $scope.ngModel", $scope.ngModel);
      if(!$scope.ngModel) {
        $scope.ngModel = new Date();
      } else {
        if(!angular.isDate($scope.ngModel)) {
          $scope.ngModel = new Date($scope.ngModel);
          //$scope.ngModel = moment.utc($scope.ngModel).toDate();
        }
      }
      console.log("utc date $scope.ngModel after", $scope.ngModel);
    }
  };
}