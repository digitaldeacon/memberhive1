
import {saveAs} from "../../../scripts/FileSaver.min";
export function PersonExportPDFController(
  Person,
  mhConfig,
  $window
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';
  
  this.getPDF = () => {
    Person.exportPDF().$promise.then(
      (data) => {
        console.log($window.atob(data.pdf.$data));
        var file = new Blob([$window.atob(data.pdf.$data)], { type: 'application/pdf' });
        saveAs(file, "export.pdf");
      }
    );
  };
  
}
