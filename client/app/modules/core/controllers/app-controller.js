export function AppController($scope, $rootScope, $cookies, gettextCatalog, PersonService, $state, productName, $mdSidenav, GemAcl) {
  $scope.toggleMenu = function() {
    $mdSidenav('menu').toggle();
  };
    
  /**
   * Get the title of the current page
   *
   * @todo Translate the page title (Can't be done in the config phase when the pageTitles are created)
   *
   * @returns {string} The formatted title
   */
  this.getTitle = () => {
    if ($state.current.hasOwnProperty('data'))
      return `${$state.current.data.pageTitle} | ${productName}`;
    return productName;
  };
}
