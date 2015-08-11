import {saveAs} from "../../../scripts/FileSaver.min";

export function PersonExportVCardController(Person) {"ngInject";
  this.getAllVCard = () => {
    Person.exportVCard().$promise.then(
      (data) => {
        var file = new Blob([data.vcard], { type: 'text/vcard' });
        saveAs(file, "export.vcard");
      }
    );
  };
}
