export function PersonEditController (
  $state,
  gettextCatalog,
  PersonEditService,
  PersonService,
  resolvePerson,
  Shout
) 
{    "ngInject";
  this.person = resolvePerson;
  this.showExtended = false;
  this.personService = PersonService;
 
  this.save = () => {
    this.saveRedirect(null);
  };
  
  this.saveAndClose = () => {
    this.saveRedirect('person.list');
  };
  
  this.saveAndNew = () => {
    this.saveRedirect('person.create');
  };
    /*if(this.shouldHaveAccount && !this.hasAccount) {
          Person.account.create({id: data.id}, {"username": data.firstName + "_"+data.lastName, "email": data.email, "password": data.lastName});
        }*/
  this.saveRedirect = (redirect) => {
    PersonEditService.save(this.person).then(
      (data) => {
        Shout.message(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: this.person.fullName}));
        if(redirect !== null) {
          $state.go(redirect);
        }
      },
      (err) => {
        Shout.vError(err);
      }
    );
  };
}
