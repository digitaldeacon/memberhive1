/***
 Global Directives
 ***/

// Route State Load Spinner (used on page or content load)
angular.module('gemmiiWebApp').directive('ngSpinnerBar', ['$rootScope',
    $rootScope => {
    return {
      link: (scope, element) => {
        // by default hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', () => {
          element.removeClass('hide'); // show spinner bar
        });

        // hide the spinner bar on route change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', () => {
          element.addClass('hide'); // hide spinner bar
          $('body').removeClass('page-on-load'); // remove page loading indicator
          Layout.setSidebarMenuActiveLink('match', null); // activate selected link in the sidebar menu

          // auto scroll to page top
          setTimeout(() => {
            Metronic.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on('$stateNotFound', () => {
          element.addClass('hide'); // hide spinner bar
        });

        // handle errors
        $rootScope.$on('$stateChangeError', () => {
          element.addClass('hide'); // hide spinner bar
        });
      }
    };
  }
]);
