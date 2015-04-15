import 'iso-3166-country-codes-angular';

import {AddressService} from './services/address-service';
import {AddressDirective} from './directives/address-directive';

export var gemAddressModule = angular.module('gem.address',
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

gemAddressModule.factory('AddressService', AddressService);
gemAddressModule.directive('formataddress', AddressDirective);
