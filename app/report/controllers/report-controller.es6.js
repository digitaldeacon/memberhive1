function ReportController($scope,Report,config,Person,gettext,LoopBackAuth) {
  var _self = this;
  _self.curUser = LoopBackAuth.currentUserId;
  _self.data = '{"group": {"operator": "AND","rules": []}}';
  _self.name = '';

  _self.report = {
    name: 'test',
    slur: 'person/simple',
    query: {},
    active: true,
    widgetize: false,
    createdAt: new Date(),
    createdBy: _self.curUser
  };

  $scope.json = null;
  $scope.name = _self.name;

  // this we should get via Person.model.properties (according to loopback_angular_addModelData)
  // TODO: this is not working yet
  _self.personModel = [
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

  _self.setQBFilters = function() {
    return _self.personModel;
  };

  _self.saveQuery = function(json) {
    _self.data = JSON.stringify(json, null, 2);
    $scope.filter = JSON.parse(_self.data);
    $scope.$apply();
    _self.report.query = $scope.filter;
    _self.report.name = $scope.name;
    Report.upsert({},_self.report,(data) => {});
  };

  $scope.filter = JSON.parse(_self.data);
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
