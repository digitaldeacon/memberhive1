angular
    .module('gemmiiWebApp')
    .controller(
        'PersonCtrl', 
        function ($scope, Restangular) {
            $scope.people = Restangular.all('people').getList().$object;;
        }
    );
