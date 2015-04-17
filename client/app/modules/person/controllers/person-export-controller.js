import {saveAs} from "scripts/FileSaver.min";

export function PersonExportController(Person, $http)
{
  
  this.export = () => {
    $http.post('https://localhost:3000/htmlToPdf', {html:'<h2>hello word!</h2>'}, { responseType: 'arraybuffer' }).
      success(function(data, status, headers, config) {
        var file = new Blob([data], { type: 'application/pdf' });
        saveAs(file, 'filename.pdf');
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  };
  
}