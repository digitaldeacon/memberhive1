import 'iso-3166-country-codes-angular';

import {AddressService} from './services/address-service';
import {AddressDirective, AddressEditDirective} from './directives/address-directive';

export var gemAddressModule = angular.module('gem.address',
  [
    'iso-3166-country-codes'
  ]
);
gemAddressModule.factory('AddressService', AddressService);
gemAddressModule.directive('formataddress', AddressDirective);
gemAddressModule.directive('gemAddressEdit', AddressEditDirective);
