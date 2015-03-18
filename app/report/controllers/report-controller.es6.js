'use strict';
export function ReportController($scope,Report,Person,LoopBackAuth,Shout,gettext) {
  var _self = this;
  _self.curUser = LoopBackAuth.currentUserId;
  _self.data = '{"group": {"operator": "AND","rules": []}}';
  _self.name = '';

  _self.report = {
    name: 'My report',
    slur: 'person/simple',
    query: {}, // the "where" part, specific to underlying DAL (like loopback)
    rule: _self.data, // jQuery Plugin specific (so we can reload a created query)
    active: true,
    widgetize: false,
    createdAt: new Date(),
    createdBy: _self.curUser
  };

  //$scope.json = null;
  $scope.name = _self.name;

  /** Functions **/
  _self.getReport = () => {
    Report.find().$promise.then(data => _self.report=data);
  };
  _self.setBuilderRules = () => {
    return _self.report.rule;
  };
  _self.setBuilderFilters = () => {
    return _self.personModel;
  };

  _self.saveQuery = queryObj => {
    //_self.data = JSON.stringify(queryObj.query, null, 2);
    //$scope.filter = JSON.parse(_self.data);
    //$scope.$apply();
    _self.report.query = queryObj.query;
    _self.report.rule = queryObj.rule;
    _self.report.name = $scope.name;
    Report.upsert({},_self.report).$promise.catch(e => Shout.error(e));
  };

  /** Watchers **/
  /*$scope.filter = JSON.parse(_self.data);
   $scope.$watch('filter', function(newValue) {
   $scope.json = JSON.stringify(newValue, null, 2);
   }, true);*/

  /** Dictionaries **/
  _self.personModel = [
    {id: 'firstName',label: gettext('Firstname'),type: 'string',optgroup: gettext('Person')},
    {id: 'lastName',label: gettext('Lastname'),type: 'string',optgroup: gettext('Person')},
    {
      id: 'gender',label: gettext('Gender'),type: 'string',optgroup: gettext('Person'),
      input:'radio',values:{'m':gettext('Male'),'f':gettext('Female')}
    },
    {
      id: 'birthdate',label: gettext('Birthdate'),type: 'date',optgroup: gettext('Person'),
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
}
