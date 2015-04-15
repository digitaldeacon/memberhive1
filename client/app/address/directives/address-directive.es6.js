export function AddressDirective() {
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: '/address/directives/address.html',
    replace: true
  };
}
