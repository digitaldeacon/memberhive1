export function SidebarController (
  Account, 
  $state, 
  GemAcl, 
  MainMenu, 
  $timeout, 
  $mdSidenav
) 
{
  "ngInject";
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

  this.isMenuLocked = false;
  this.isMenuCollapsing = false;
  this.isHovering = true;

  this.menuClass = () => {
    if(this.isMenuLocked || ($mdSidenav('left').isLockedOpen() === false && $mdSidenav('left').isOpen() === true)) {
      return '';
    } else {
      if(this.isMenuCollapsing) {
        return 'is-collapsing';
      } else {
        if(this.isHovering)
          return 'admin-sidebar-collapsed';
        else
          return '';
      }
    }
  };

  this.collapseSubmenu = () => {
    return !this.isMenuLocked ? this.isHovering : false;
  };

  this.toggleMenuLock = () => {
    if(this.isMenuLocked === false) {
      this.isMenuLocked = true;
    } else {
      this.isMenuLocked = false;
    }
  };

  this.menuLockIcon = () => {
    return this.isMenuLocked ? 'unfold_less' : 'unfold_more';
  };

  this.hover = (state) => {
    this.isHovering = state;
  };

  this.selected = '';
}
