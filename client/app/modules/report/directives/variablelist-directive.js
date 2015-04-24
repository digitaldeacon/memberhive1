/**
 * This directive lists the available variables from the QueryBuilder.
 */
export function VariableListDirective() {

  return {
    restrict: 'E',
    scope: {
      dataSource: '=source'
    },
    templateUrl: 'modules/report/directives/variablelist-template.html'
  };
}
