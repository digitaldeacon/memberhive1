export function utcDate() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            var toView = function(val) {
                return val;
            };

            var toModel = function(val) {
                var offset = moment(val).utcOffset();
                var date = new Date(moment(val).add(offset, 'm'));
                return date;
            };

            ngModel.$formatters.unshift(toView);
            ngModel.$parsers.unshift(toModel);
        }
    };
}