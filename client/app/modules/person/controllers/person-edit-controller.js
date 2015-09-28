export function PersonEditController (
  $filter,
  $state,
  $stateParams,
  gettextCatalog,
  Person, 
  PersonService, 
  PersonEditService,
  resolvePerson,
  Shout
) 
{    "ngInject";
  this.status = [];
  this.person = resolvePerson;

  this.getTitle = () => {
    if (this.isEditing()) {
      return $filter('formatName')(this.person);
    } else {
      return gettextCatalog.getString('Create new Person');
    }
  };
  
  
  this.save = () => {
    this.saveRedirect(null);
  };
  
  this.saveAndClose = () => {
    this.saveRedirect('person.list');
  };
  
  this.saveAndNew = () => {
    this.saveRedirect('person.create');
  };
  
  this.saveRedirect = (redirect) => {
    Person.upsert({}, this.person)
    .$promise.then(
      (data) => {
        /*if(this.shouldHaveAccount && !this.hasAccount) {
          Person.account.create({id: data.id}, {"username": data.firstName + "_"+data.lastName, "email": data.email, "password": data.lastName});
        }*/
        Shout.message(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: this.$filter('formatName')(this.person)}));
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
