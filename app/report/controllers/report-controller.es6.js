export function ReportController($scope, Report, Person, LoopBackAuth) {
  var _self = this;
  _self.curUser = LoopBackAuth.currentUserId;
  _self.data = '{"group": {"operator": "AND","rules": []}}';
  _self.name = '';

  _self.report = {
    name: 'test',
    slur: 'person/simple',
    query: {}, // the "where" part, specific to underlying DAL (like loopback)
    rule: {}, // jQuery Plugin specific (so we can reload a created query)
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

  _self.setQBFilters = () => {
    return _self.personModel;
  };

  _self.saveQuery = queryObj => {
    //_self.data = JSON.stringify(queryObj.query, null, 2);
    /*var q = JSON.stringify(queryObj.query, null, 2);
    var r = JSON.stringify(queryObj.rule, null, 2);
    console.log(q);
    console.log(r);
    console.log(queryObj.query);
    console.log(queryObj.rule);*/
    //$scope.filter = JSON.parse(_self.data);
    //$scope.$apply();
    _self.report.query = queryObj.query;
    _self.report.rule = queryObj.rule;
    _self.report.name = $scope.name;
    Report.upsert({},_self.report).$promise.catch(e => console.log(e));
  };

  $scope.filter = JSON.parse(_self.data);
  $scope.$watch('filter', function(newValue) {
    $scope.json = JSON.stringify(newValue, null, 2);
  }, true);

}
