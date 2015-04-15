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
