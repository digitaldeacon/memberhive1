export function mhWidgetPersonRandom() {
  return {
    templateUrl: 'app/modules/person/widgets/random/view.html',
    restrict: 'E',
    scope: {
      person: '=',
    },
    controller: function($scope, Person) {
      $scope.randomPerson = Person.random();
    }
  };
}
