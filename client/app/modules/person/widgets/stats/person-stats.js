export var PersonStatsWidget = angular.module('gem.person.widget.stats', ['adf.provider']);

import {PersonStatsController} from './person-stats-controller';

PersonStatsWidget.config((dashboardProvider, gettext) => {
  dashboardProvider.widget('person.stats', {
    title: gettext('Person Statistics'),
    description: gettext('Show Person Statistics'),
    templateUrl: '/modules/person/widgets/stats/view.html',
    controller: 'PersonStatsController as pc',
    reload: true,
    edit: {
      templateUrl: '/modules/person/widgets/stats/edit.html'
    }
  });
});

PersonStatsWidget.controller('PersonStatsController', PersonStatsController);
