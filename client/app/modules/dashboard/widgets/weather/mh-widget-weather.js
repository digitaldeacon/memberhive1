'use strict';

export var mhWidgetWeather =  angular.module('adf.widget.weather', ['adf.provider'])
    .value('weatherServiceUrl', 'http://api.openweathermap.org/data/2.5/weather?units=metric&callback=JSON_CALLBACK&q=')
    .config((dashboardProvider,gettext) => {
      dashboardProvider
        .widget('weather', {
          title: gettext('Weather'),
          description: gettext('Display the current temperature of a city'),
          templateUrl: '{widgetsPath}/weather/src/view.html',
          controller: 'weatherCtrl',
          reload: true,
          resolve: {
            data: ["weatcherService", "config", function(weatcherService, config){
              if (config.location){
                return weatcherService.get(config.location);
              }
            }]
          },
          edit: {
            templateUrl: '{widgetsPath}/weather/src/edit.html'
          }
        });
    })
    .service('weatcherService', ($q, $http, weatherServiceUrl) => {
      return {
        get: function(location){
          var deferred = $q.defer();
          var url = weatherServiceUrl + location;
          $http.jsonp(url)
            .success(function(data){
              if (data && data.cod === 200){
                deferred.resolve(data);
              } else {
                deferred.reject();
              }
            })
            .error(function(){
              deferred.reject();
            });
          return deferred.promise;
        }
      };
    })
    .controller('weatherCtrl', ($scope, data) => {
      $scope.data = data;
    });

  angular.module("adf.widget.weather").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/weather/src/edit.html","<form role=form><div class=form-group><label for=location translate>Location</label> <input type=location class=form-control id=location ng-model=config.location placeholder=\"Enter location\"></div></form>");
    $templateCache.put("{widgetsPath}/weather/src/view.html","<div class=text-center><div class=\"alert alert-info\" ng-if=!data><translate>Please insert a location in the widget configuration</translate></div><div class=weather ng-if=data><h4>{{data.name}} ({{data.sys.country}})</h4><dl><dt translate>Temperature:</dt><dd>{{data.main.temp | number:2}}</dd></dl></div></div>");}]);
