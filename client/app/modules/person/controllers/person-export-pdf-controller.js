
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  LoopBackResourceProvider,
  mhConfig,
  $window,
  $http
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.getPDF = () => {
    $http.get('/app/modules/person/templates/export-pdf.html')
    .then((html) => {
      var resource =
        LoopBackResourceProvider.$get('/Persons/exportPDF', {},
          {'get' : {method:'GET', responseType: 'arraybuffer'}});
      resource.get({html: html.data}).$promise.then(
        (data) => {
          console.log($window.atob(data.pdf.$data));
          var file = new Blob([$window.atob(data.pdf.$data)], { type: 'application/pdf' });
          saveAs(file, "export.pdf");
        }
      );
    });
  };

}
