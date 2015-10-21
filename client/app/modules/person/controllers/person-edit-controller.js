export function PersonEditController (
  $state,
  gettextCatalog,
  PersonEditService,
  PersonService,
  resolvePerson,
  Shout
) 
{    "ngInject";
  this.person = PersonEditService.transform(resolvePerson);
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
    var p = PersonEditService.transformBack(this.person);
    PersonEditService.save(p).then(
      (data) => {
        Shout.message(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: data.fullName}));
        this.person = PersonEditService.transform(data);
        if(redirect !== null) {
          $state.go(redirect);
        }
      },
      (err) => {
        Shout.vError(err);
      }
    );
  };
  
  this.addItem = (val) => {
    this.person[val].push({key: "", value : ""});
  };
  
 
}
