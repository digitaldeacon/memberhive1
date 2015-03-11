angular.module('gem.dashboard',
  ['adf','structures','adf.widgets.weather'])
  .config(
    ($stateProvider, gettext) => {
      $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: '../dashboard/views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
        data: {
          pageTitle: gettext('Dashboard')
        },
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'gem.dashboard',
              insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
              files: [
                '_global/scripts/metronic/plugins/morris/morris.css',
                '_global/scripts/metronic/pages/css/tasks.css',
                '_global/scripts/metronic/plugins/morris/morris.min.js',
                '_global/scripts/metronic/plugins/morris/raphael-min.js',
                '_global/scripts/metronic/pages/tasks.js',
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
  );
