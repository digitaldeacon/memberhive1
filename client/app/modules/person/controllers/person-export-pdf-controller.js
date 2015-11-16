
export function PersonExportPDFController(
  Person,
  mhConfig
) {"ngInject";
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';
  
  this.getPDF = () => {
    console.log("get pdf");
    Person.exportPDF();
  };
  
}
