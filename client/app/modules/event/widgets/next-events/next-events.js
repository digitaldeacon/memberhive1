var mhWidgetNextEvents = function () {
  return {
    templateUrl: 'app/modules/event/widgets/next-events/view.html',
    restrict: 'E',
    controllerAs : 'ctrl',
    controller: ($scope, EventService, EventStatusOptions) => {"ngInject";
      $scope.nextEvents = EventService.future({limit: 10});
      $scope.countStatus = EventService.countStatus;
      $scope.statusOptions = EventStatusOptions;

    },
  };
};

angular.module('mh.event').directive('mhWidgetNextEvents', mhWidgetNextEvents);
