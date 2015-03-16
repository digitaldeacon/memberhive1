function ReportController($scope,Report, config, Person,gettext) {
  var report = this;
  var data = '{"group": {"operator": "AND","rules": []}}';
  $scope.json = null;

  report.personModel = [
    {id: 'firstName',label: 'Firstname',type: 'string',optgroup: 'Person'},
    {id: 'lastName',label: 'Lastname',type: 'string',optgroup: 'Person'},
    {id: 'gender',label: 'Gender',type: 'string',optgroup: 'Person'},
    {
      id: 'birthdate',
      label: 'Birthdate',
      type: 'date',
      optgroup: 'Person',
      validation: {
        format: 'YYYY/MM/DD'
      },
      plugin: 'datepicker',
      plugin_config: { // jshint ignore:line
        format: 'yyyy/mm/dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true
      }
    }
  ];

  this.setQBFilters = function() {
    return report.personModel;
  };

  this.saveQuery = function(json) {
    $scope.data = JSON.stringify(json, null, 2);
    $scope.filter = JSON.parse(data);
  };

  $scope.filter = JSON.parse(data);

  $scope.$watch('filter', function(newValue) {
    $scope.json = JSON.stringify(newValue, null, 2);
  }, true);

}

angular
  .module('gem.report')
  .controller(
  'ReportController',
  ReportController
);
