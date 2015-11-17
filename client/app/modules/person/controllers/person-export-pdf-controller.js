
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  mhConfig,
  $window,
  $http
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';
  
  this.getPDF = () => {
    $http.get('/app/modules/person/templates/export-pdf.html')
    .then((html) => {
      Person.exportPDF({
        html: html.data
      }).$promise.then(
        (data) => {
          console.log($window.atob(data.pdf.$data));
          var file = new Blob([$window.atob(data.pdf.$data)], { type: 'application/pdf' });
          saveAs(file, "export.pdf");
        }
      );
    });
  };
  
}
