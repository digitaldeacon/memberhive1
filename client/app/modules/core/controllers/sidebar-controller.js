export function SidebarController (Account, $state, GemAcl, MainMenu, $timeout, $mdSidenav) {

  this.logout = () => {
    Account.logout().$promise.then((resp) => {
      GemAcl.setRights([]);
      $state.go('login');
    });
  };

  this.mainMenu = MainMenu.getItems();


  this.closeMenu = () => {
    $timeout(function() { $mdSidenav('left').close(); });
  };

  this.openMenu = () => {
    $timeout(function() { $mdSidenav('left').open(); });
  };

  this.selected = '';
}
