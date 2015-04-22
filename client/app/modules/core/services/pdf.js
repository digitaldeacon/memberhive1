import _ from 'lodash';
import {saveAs} from "scripts/FileSaver.min";
export function GemPdf(Shout, $http) {
  
  return {
    generate: (html, options, filename) => {
      $http({
        url: 'https://localhost:3000/htmlToPdf',
        method: 'POST',
        data: JSON.stringify({html: html, options: options}),
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        responseType: 'arraybuffer'})
      .success(function(data, status, headers, config) {
          var file = new Blob([data], { type: 'application/pdf' });
          saveAs(file, filename);
      })
      .error(function(data, status, headers, config) {
          Shout.sError(data);
      });
    }

  };
}
