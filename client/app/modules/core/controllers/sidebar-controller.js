export function SidebarController (
  Account, 
  $state, 
  GemAcl, 
  MainMenu, 
  $timeout, 
  $mdSidenav,
  AccountOptions
) 
{"ngInject";
  this.mainMenu = MainMenu.getItems();

  this.closeMenu = () => {
    $mdSidenav('left').close();
  };

  this.openMenu = () => {
    $mdSidenav('left').open();
  };

  this.isMenuLocked = AccountOptions.get('sidebar_locked');
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
    return !this.isMenuLocked && !($mdSidenav('left').isLockedOpen() === false && $mdSidenav('left').isOpen() === true) ? this.isHovering : false;
  };

  this.toggleMenuLock = () => {
    this.isMenuLocked = !this.isMenuLocked;
    AccountOptions.set('sidebar_locked', this.isMenuLocked);
  };

  this.menuLockIcon = () => {
    return this.isMenuLocked ? 'unfold_less' : 'unfold_more';
  };

  this.hover = (state) => {
    this.isHovering = state;
  };

  this.selected = '';
  
  
  
 
}
