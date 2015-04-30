/**
 * This directive lists the available variables from the QueryBuilder.
 */
export function VariableListDirective() {

  return {
    restrict: 'E',
    scope: {
      dataSources: '=sources'
    },
    templateUrl: 'modules/report/directives/variablelist-template.html'
  };
}
