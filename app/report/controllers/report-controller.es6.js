function ReportController($scope,Report, config, Person,gettext) {
  var report = this;
  report.personService = Person;
  $scope.json = 'Test';

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
      }}
  ];

  this.setQBFilters = function() {
    return report.personModel;
  };

  this.saveQuery = function(val) {
    //console.log(val);
  };

  $scope.$watch('filter', function (newValue) {
    $scope.json = JSON.stringify(newValue, null, 2);
    //$scope.output = computed(newValue.group);
  }, true);
}

angular
  .module('gem.report')
  .controller(
  'ReportController',
  ReportController
);
