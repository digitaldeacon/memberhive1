function PersonController (Person) {
  var main = this;
  this.persons = [];
  this.editedPerson = null;
  this.newPerson = null;
  this.isEditing = false;

  function getPersons() {
    Person.find(result => main.persons = result);
  }

  function createPerson(person) {
    Person.create(person, () => {
      initCreateForm();
      getPersons();
    });
  }

  function updatePerson(person) {
    Person.upsert(person, () => {
      cancelEditing();
      getPersons();
    });
  }

  function deletePerson(personId) {
    Person.deleteById({id: personId}, () => {
      cancelEditing();
      getPersons();
    });
  }

  function initCreateForm() {
    main.newPerson = {firstName: '', lastName: '', email: '', gender: 'male', birthday: ''};
  }

  function setEditedPerson(person) {
    main.editedPerson = angular.copy(person);
    main.isEditing = true;
  }

  function isCurrentPerson(personId) {
    return main.editedPerson !== null && main.editedPerson.id === personId;
  }

  function cancelEditing() {
    main.editedPerson = null;
    main.isEditing = false;
  }

  this.getPersons = getPersons;
  this.createPerson = createPerson;
  this.updatePerson = updatePerson;
  this.deletePerson = deletePerson;
  this.setEditedPerson = setEditedPerson;
  this.isCurrentPerson = isCurrentPerson;
  this.cancelEditing = cancelEditing;

  initCreateForm();
  getPersons();
}

angular
  .module('gem.person')
  .controller(
  'PersonController',
  PersonController
);
