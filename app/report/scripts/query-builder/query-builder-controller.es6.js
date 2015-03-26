'use strict';

export function ReportBuildController($scope) {
  this.data = '{"group": {"operator": "AND","rules": []}}';
  var computed = null;
  var htmlEntities = null;

    this.htmlEntities = (str) => {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    this.computed = (group) => {
        if (!group) return '';
        for (var str = '(', i = 0; i < group.rules.length; i++) {
            //i > 0 && (str += ' <strong>' + group.operator + '</strong> ');
            str += group.rules[i].group ?
                computed(group.rules[i].group) :
                group.rules[i].field + ' ' + htmlEntities(group.rules[i].condition) + ' ' + group.rules[i].data;
        }

        return str + ')';
    };

    $scope.json = null;

    $scope.filter = JSON.parse(this.data);

    $scope.$watch('filter', function (newValue) {
        $scope.json = JSON.stringify(newValue, null, 2);
        $scope.output = this.computed(newValue.group);
    }, true);
}
