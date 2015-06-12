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
    templateUrl: 'modules/core/templates/menu-item.html',
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

export function mhDropdownMenu() {
  return {
    restrict: 'E',
    scope: {
      'icon': '='
    },
    transclude: true,
    templateUrl: 'modules/core/templates/dropdown-menu.html',
     link: function($scope, $element) {
      var scope = $scope.$new();
      scope.open = false;
      $scope.toggle = () => {
        scope.open = !scope.open;
      };
      $scope.close = () => {
        scope.open = false;
      };
      $scope.isOpen = () => {
        return scope.open;
      };
    }
  };
}


export function mhDropdownMenuItem() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<li ng-transclude></li>'
  };
}
export function mhOutsideClick($document) {
  return {
    link: function( $scope, $element, $attributes ){
        var scopeExpression = $attributes.mhOutsideClick;

        var onDocumentClick = function(event){
          var el = angular.element(event.target);
          console.log(el.hasClass('mh-toggle-button'));
          if(!el.hasClass('mh-toggle-button') && !el.hasClass('mh-toogle-menu')) {
            $scope.$apply(scopeExpression);
          }
        };

        $document.on("click", onDocumentClick);

        $element.on('$destroy', function() {
            $document.off("click", onDocumentClick);
        });
    }
  };
}
