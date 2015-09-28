export function PersonEditController (
  PersonService, 
  Person, 
  $stateParams,
  $filter,
  gettextCatalog,
  PersonEditService
) 
{    "ngInject";
  
  this.load = () => {
    var promise;
    if (this.isEditing()) {
      promise = PersonEditService.getPerson($stateParams.id);
    } else {
      promise = PersonEditService.newPerson();
    }
    promise.then((p) => {this.person = p; console.log(p)});
  };

  
  this.isEditing = () => {
    return $stateParams.id !== undefined;
  };

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
    
  };
  
  this.load();
}
