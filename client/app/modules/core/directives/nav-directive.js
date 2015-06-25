export function uiNavDirective() {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {
      el.find('a').bind('click', function (e) {
        var li = angular.element(this).parent();
        var active = li.parent()[0].querySelectorAll('.active');
        li.toggleClass('active');
        angular.element(active).removeClass('active');
      });
    }
  };
}
export function mhMenuItem($mdSidenav) {
  return {
    restrict: 'E',
    scope: {
      'item': '='
    },
    templateUrl: 'app/modules/core/templates/menu-item.html',
    link: function($scope, $element) {
      var scope = $scope.$new();
      scope.open = false;
      scope.icon = 'keyboard_arrow_down';

      $scope.isOpen = function() {
        return scope.open;
      };

      $scope.icon = () => {
        return scope.icon;
      };

      $scope.toggle = function() {
        scope.open = !scope.open;
        if(scope.open) {
           scope.icon = 'keyboard_arrow_right';
        } else {
           scope.icon = 'keyboard_arrow_down';
        }
      };
      $scope.closeMenuBar = function() {
        $mdSidenav('left').close();
      };
    }
  };
}

export function mhMenuIconItem() {
  return {
    restrict: 'E',
    scope: {
      'item': '='
    },
    templateUrl: 'app/modules/core/templates/menu-icon-item.html',
  };
}

