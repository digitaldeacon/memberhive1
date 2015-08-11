import {saveAs} from "../../../scripts/FileSaver.min";

export function PersonExportCSVController(Person) {"ngInject";
  this.getAllCSV = () => {
    Person.exportCSV().$promise.then(
      (data) => {
        var file = new Blob([data.csv], { type: 'text/csv' });
        saveAs(file, "export.csv");
      }
    );
  };
}
