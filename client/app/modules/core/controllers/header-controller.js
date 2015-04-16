export class HeaderController {
  constructor($scope, $state, $q, Search) {
    this.Search = Search;
    this.$state = $state;
    this.$scope = $scope;
    this.$q = $q;
    this.term = '';

    $scope.component = this.getComponent();
    $scope.$on('$stateChangeSuccess', () => {
      $scope.component = this.getComponent();
    });
  }

  getSearch(value) {
    var promises = this.Search.byComponent(this.getComponent(), value);
    var results = [];
    return this.$q.all(promises).then(data => {
      data.map(item => {
        results = item;
      });
      return results.results;
    });
  }

  getComponent() {
    if (this.$state.current.hasOwnProperty('data'))
      return this.$state.current.data.component;
    return 'all';
  }
}
