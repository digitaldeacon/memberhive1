import {AddressService} from './services/address-service';
import {AddressDirective, AddressEditDirective} from './directives/address-directive';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';

export var gemAddressModule = angular.module('mh.address',
  [
    'iso-3166-country-codes'
  ]
);
gemAddressModule.factory('AddressService', AddressService);
gemAddressModule.directive('formataddress', AddressDirective);
gemAddressModule.directive('mhAddressEdit', AddressEditDirective);
