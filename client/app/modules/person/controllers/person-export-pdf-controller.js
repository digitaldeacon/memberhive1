
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
    $window.open(
      mhConfig.apiUrl+'/Persons/exportPDF?access_token='+$rootScope.accessToken+
      "&root=http://"+location.hostname+":"+location.port+"/","_blank");
  };

}
