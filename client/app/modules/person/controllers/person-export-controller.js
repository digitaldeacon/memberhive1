

export function PersonExportController(Person, PersonService, GemPdf)
{
  
  this.persons = Person.find(
    {
      filter: {
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
        }
      
    }
  );
  
  this.export = () => {
    GemPdf.generate(
      angular.element('#export-html').html(),
      {
        encoding: 'UTF-8',
        pageSize : 'A5'
        /*marginTop :'1.0cm',
        marginRight :'1.3cm',
        marginBottom :'1.0cm',
        marginLeft :'1.3cm'*/
      }, 
      'gemeindeliste.pdf');
  };
  
}