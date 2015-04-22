export function AddressDirective() {
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: '/modules/address/directives/address.html',
    replace: true
  };
}

export function AddressEditDirective() {
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: '/modules/address/directives/address_edit.html',
    replace: true
  };
}
