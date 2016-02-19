
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  AccountOptions,
  mhConfig,
  $window,
  $http,
  $rootScope
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.options = AccountOptions.get('person-export-pdf-options',
    {
      cover: false,
    }
  );

  this.getPDF = (groups, status, tags) => {
    console.log(this.options);
    var url = location.protocol+"//"+location.hostname;
    if(location.port)
      url += ":"+location.port;
    url += "/standalone/pdf.css";

    var apiUrl;
    if(_.startsWith(mhConfig.apiUrl, '/')) {
      apiUrl = location.protocol+"//"+location.hostname;
      if(location.port) {
        apiUrl += ":"+location.port;
      }
      apiUrl += mhConfig.apiUrl;
    } else {
      apiUrl = mhConfig.apiUrl;
    }

   /*jshint camelcase: false */
    var params =
    {

      access_token: $rootScope.accessToken,
      css: url,
      apiBase: apiUrl,
      filter: {
        groups: _.map(groups, (g) => g.id),
        status: status,
        tags: tags
      },
      options: angular.toJson(this.options)
    };
    $window.open(mhConfig.apiUrl+'/Persons/exportPDF?'+jQuery.param(params),"_blank");
    AccountOptions.set('person-export-pdf-options', this.options);
  };

}
