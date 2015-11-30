
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
        new LoopBackResource(
          mhConfig.apiUrl+'/Persons/exportPDF', 
          {},
          {'post' : {method:'POST', responseType: 'blob'}}
        );
        
      console.log("resource", resource);
      
      resource.post({html: html.data},
        (data) => {
          console.log("data", data);
          var file = new Blob([data], { type: 'application/pdf' });
          saveAs(file, "export.pdf");
        }
      );
    });
  };

}
