

export function PersonExportController(Person, GemPdf)
{
  this.persons = Person.find();
  this.export = () => {
    GemPdf.generate(angular.element('#export-html').html(), {}, 'gemeindeliste.pdf');
  };
  
}