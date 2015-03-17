import 'country-codes';

angular.module('gem.address',
  [
    'iso-3166-country-codes'
  ]
).config(
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
