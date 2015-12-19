
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  mhConfig,
  $window,
  $http,
  $rootScope
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.getPDF = () => {
    var url = "http://"+location.hostname;
    if(location.port)
      url += ":"+location.port;
    url += "/app/standalone/pdf.css";
    
    $window.open(
      mhConfig.apiUrl+'/Persons/exportPDF?access_token='+$rootScope.accessToken+
      "&css="+url,"_blank");
  };

}
