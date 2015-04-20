import _ from 'lodash';
import {saveAs} from "scripts/FileSaver.min";
export function GemPdf(Shout, $http) {
  
  return {
    generate: (html, options, filename) => {
      $http.post(
        'https://localhost:3000/htmlToPdf', 
        _.merge(options, {html: html}), 
        { responseType: 'arraybuffer' })
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
