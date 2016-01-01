export function mhWidgetPersonNextBirthdays() {"ngInject";
  return {
    templateUrl: 'app/modules/person/widgets/nextBirthdays/view.html',
    restrict: 'E',
    scope: {
      person: '=',
    },
    controller: ($scope, PersonService) => {"ngInject";
      var now = new Date();
      var nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      PersonService.getAll().then((persons) => {
        $scope.persons = _.filter(persons,
          p => {
            if(!p.dates || !p.dates.birthday) return false;
            var bday = p.dates.birthday;
            bday.setFullYear(now.getFullYear());
            return bday > now && bday < nextWeek;
          });
      });
    }
  };
}
