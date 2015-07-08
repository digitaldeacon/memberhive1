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

  this.toggleMenuLock = (e) => {
    console.log(e);
  };

  this.isMenuLocked = false;
  this.isMenuCollapsing = false;
  this.isHovering = false;

  this.menuClass = () => {
    return this.isMenuLocked === !0
      ? ''
      : this.isMenuCollapsing === !0
        ? 'is-collapsing'
        : 1 == this.isHovering
          ? 'admin-sidebar-collapsed'
          : '';
  };

  this.toggleMenuLock = () => {
    !this.isMenuLocked ? this.isMenuLocked = true : this.isMenuLocked = false;
    console.log(this.isMenuLocked);
  };

  this.menuLockIcon = () => {
    return this.isMenuLocked ? 'unfold_less' : 'unfold_more';
  };

  this.hover = (state) => {
    this.isHovering = state;
  };

  this.selected = '';
}
