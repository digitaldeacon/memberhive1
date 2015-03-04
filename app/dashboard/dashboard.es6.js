angular.module('gem.dashboard',
  ['adf','structures','adf.widgets.weather'])
  .config(
  [
    '$stateProvider',
    '$urlRouterProvider', $stateProvider =>
    {
      $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: '../dashboard/views/dashboard.html',
        data: {
          pageTitle: 'Dashboard'
        },
        controller: 'DashboardController',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'gem.dashboard',
              personId: 1,
              options: {},
              insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
              files: [
                'scripts/metronic/plugins/morris/morris.css',
                'scripts/metronic/pages/css/tasks.css',
                'scripts/metronic/plugins/morris/morris.min.js',
                'scripts/metronic/plugins/morris/raphael-min.js',
                'scripts/metronic/pages/tasks.js',
                'scripts/dashboard/controllers/dashboard-controller.js'
              ]
            });
          }]
        },
        acl: {
          needRights: ['$authenticated']
        }
     });
    }
  ]
  );

