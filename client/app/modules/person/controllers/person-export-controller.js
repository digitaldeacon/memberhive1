

export function PersonExportController(Person, PersonService, GemPdf)
{
  PersonService.reallyAll().$promise.then((data) => console.log(data));
  
  this.persons = Person.find(
    {
      filter: {
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
          include: [
            'addresses',
          ]
        }
      
    }
  );
  
  this.export = () => {
    GemPdf.generate(angular.element('#export-html').html(), {}, 'gemeindeliste.pdf');
  };
  
}