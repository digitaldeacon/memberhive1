angular.module('gem.address').config(
  ($stateProvider,gettext) => {
    $stateProvider.state('address', {
      url: '/address',
      template: '<ui-view/>',
      data: {
        pageTitle: gettext('Address'),
        component: 'address'
      },
      abstract: true
    });
  }
);
