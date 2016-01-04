export function SidebarController (
  Account, 
  $state, 
  $timeout, 
  $mdSidenav,
  AccountOptions,
  gettext
) 
{"ngInject";
  this.mainMenu = 
  [
    {label: gettext('Dashboard'), icon: "dashboard", route: "dashboard"},
    {label: gettext('Persons'), icon: "people", route: "person.list"},
    {label: gettext('Calendar'), icon: "today", route: "calendar.show"},
    {label: gettext('Notes'), icon: "note_add", route: "note.list"},
    {label: gettext('Groups'), icon: "group", route: "group.list"},
  ];

  this.closeMenu = () => {
    $mdSidenav('left').close();
  };

  this.openMenu = () => {
    $mdSidenav('left').open();
  };
  
  this.isMenuLocked = false;
  AccountOptions.get('sidebar_locked', false).then((data) => {
    this.isMenuLocked = data;
  });
  
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
