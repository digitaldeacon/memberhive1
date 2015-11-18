
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  LoopBackResource,
  mhConfig,
  $window,
  $http
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.getPDF = () => {
    $http.get('/app/modules/person/templates/export-pdf.html')
    .then((html) => {
      var resource =
        LoopBackResource(mhConfig.apiUrl+'/Persons/exportPDF', {},
          {'get' : {method:'POST', responseType: 'arraybuffer'}});
      resource.get({html: html.data}).$promise.then(
        (data) => {
          console.log(data);
          var file = new Blob([data], { type: 'application/pdf' });
          saveAs(file, "export.pdf");
        }
      );
    });
  };

}
