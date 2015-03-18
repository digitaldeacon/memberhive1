// Configure module loader
System.config({
  baseURL: '/scripts/',

  // Set paths for third-party libraries as modules
  map: {
    'angular': '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-animate': '../bower_components/angular-animate/angular-animate',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angular-touch': '../bower_components/angular-touch/angular-touch',
    'angular-fontawesome': '../bower_components/angular-fontawesome/dist/angular-fontawesome',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'angular-ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-ui-select': '../bower_components/angular-ui-select/dist/select',
    'angular-ui-sortable': '../bower_components/angular-ui-sortable/sortable',
    'angular-gettext': '../bower_components/angular-gettext/dist/angular-gettext',
    'angular-bootstrap-select': '../bower_components/angular-bootstrap-select/build/angular-bootstrap-select',
    'bootstrap-select': '../bower_components/bootstrap-select/js/bootstrap-select',
    'bootstrap-hover-dropdown': '../bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown',
    'angular-confirm': '../bower_components/angular-confirm/angular-confirm',
    'angular-moment': '../bower_components/angular-moment/angular-moment',
    'angular-schema-form': '../bower_components/angular-schema-form/dist/schema-form.min',
    'angular-schema-form-decorator': '../bower_components/angular-schema-form/dist/bootstrap-decorator.min',
    'angular-utils-pagination': '../bower_components/angular-utils-pagination/dirPagination',
    'angular-dashboard-framework':
      '../bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min',
    'moment': '../bower_components/moment/moment',
    'textAngular': '../bower_components/textAngular/dist/textAngular.min',
    'textAngular-rangy': '../bower_components/textAngular/dist/textAngular-rangy.min',
    'textAngular-sanitize': '../bower_components/textAngular/dist/textAngular-sanitize.min',
    'rangy-core': '../bower_components/rangy/rangy-core',
    'rangy-selectionsaverestore': '../bower_components/rangy/rangy-selectionsaverestore',
    'nsPopover': '../bower_components/nsPopover/src/nsPopover',
    'country-codes': '../bower_components/iso-3166-country-codes-angular/dist/iso-3166-country-codes-angular.min',
    'jquery': '../bower_components/jquery/dist/jquery',
    'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
    'lodash': '../bower_components/lodash/dist/lodash.compat',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
  },

  // Declare module dependencies
  // This option takes a key-value map from a module path to a metadata object.
  meta: {
    '../bower_components/textAngular/dist/textAngular.min': {
      deps: [
        'textAngular-rangy',
        'textAngular-sanitize',
        'rangy-core',
        'rangy-selectionsaverestore'
      ]
    },
    '../bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min': {
      deps: [
        'angular-ui-sortable'
      ]
    },
    '../bower_components/angular-ui-sortable/sortable': {
      deps: [
        'jquery-ui'
      ]
    },
    '../bower_components/angular-bootstrap-select/build/angular-bootstrap-select': {
      deps: [
        'bootstrap-select'
      ]
    }
  }
});
