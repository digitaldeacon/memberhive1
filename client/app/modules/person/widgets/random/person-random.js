export var PersonRandomWidget = angular.module('gem.person.widget.random', ['adf.provider']);

import {PersonRandomController} from './person-random-controller';

PersonRandomWidget.config((dashboardProvider, gettext) => {
  dashboardProvider.widget('person.random', {
    title: gettext('Pray for …'),
    description: gettext('Show random person as a prayer reminder'),
    templateUrl: '/app/modules/person/widgets/random/view.html',
    controller: 'PersonRandomController as pc',
    reload: true,
    resolve: {
      randomPerson: function(Person) {
        return Person.random().$promise;
      }
    }
  });
});

PersonRandomWidget.controller('PersonRandomController', PersonRandomController);
