export class AppController {
  constructor($scope, $rootScope, $cookies, gettextCatalog, PersonService) {
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this.gettextCatalog = gettextCatalog;

    $scope.init = () => {
      Metronic.init();
    };
    $scope.$on('$viewContentLoaded', () => {
      Metronic.initComponents(); // init core components
    });

    $rootScope.currentUser = PersonService.currentUser();

    this.setupLanguages();
  }

  setupLanguages() {
    this.$rootScope.locales = {
      'en': {
        lang: 'en',
        country: 'US',
        name: this.gettextCatalog.getString('English')
      },
      'de': {
        lang: 'de',
        country: 'DE',
        name: this.gettextCatalog.getString('German')
      }
    };
    var lang = this.$cookies.lang || navigator.language || navigator.userLanguage;
    this.$rootScope.locale = this.$rootScope.locales[lang] || this.$rootScope.locales.de;
    this.gettextCatalog.setCurrentLanguage(this.$rootScope.locale.lang);
  }
}
