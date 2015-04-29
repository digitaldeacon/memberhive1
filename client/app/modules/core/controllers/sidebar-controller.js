import {MainMenu} from 'modules/core/providers/menu-provider';

export class SidebarController {
  constructor($scope, Account, $state, GemAcl, MainMenu) {
    $scope.logout = () => {
      Account.logout().$promise.then((resp) => {
        GemAcl.setRights([]);
        $state.go('login');
      });
    };

    $scope.mainMenu = MainMenu.getItems();
  }
}
