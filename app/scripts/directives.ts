/// <reference path="../../typings/tsd.d.ts" />

/***
 Global Directives
 ***/

// Route State Load Spinner(used on page or content load)
Gemmii.GemmiiApp.directive('ngSpinnerBar', ['$rootScope',
  function($rootScope) {
    return {
      link: function(scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', function() {
          element.removeClass('hide'); // show spinner bar
        });

        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', function() {
          element.addClass('hide'); // hide spinner bar
          $('body').removeClass('page-on-load'); // remove page loading indicator
          Layout.setSidebarMenuActiveLink('match', null); // activate selected link in the sidebar menu

          // auto scorll to page top
          setTimeout(function () {
            Metronic.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on('$stateNotFound', function() {
          element.addClass('hide'); // hide spinner bar
        });

        // handle errors
        $rootScope.$on('$stateChangeError', function() {
          element.addClass('hide'); // hide spinner bar
        });
      }
    };
  }
]);
