export function PersonExportImagesController(
  mhConfig,
  $window,
  $rootScope,
  q
) {"ngInject";
  this.query = {};
  this.getImages = () => {
   /*jshint camelcase: false */
    var params =
    {
      access_token: $rootScope.accessToken,
    };
    q.all(this.query).then((resolved) => {
      params.filter = resolved;
      $window.open(mhConfig.apiUrl+'/Persons/exportImages?'+jQuery.param(params), "_blank");
    });
  };

}
