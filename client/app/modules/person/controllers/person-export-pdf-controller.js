
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  mhConfig,
  $window,
  $http,
  $rootScope
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.getPDF = (groups, status, tags) => {
   /*jshint camelcase: false */
    console.log(groups, status, tags);
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
      options: {
        cover: true
      }
    };

    $window.open(mhConfig.apiUrl+'/Persons/exportPDF?'+jQuery.param(params),"_blank");
  };

}
