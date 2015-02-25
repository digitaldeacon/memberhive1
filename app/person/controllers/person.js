function PersonController (Person) {
  function getPersons() {
    Person.find(result => this.persons = result);
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
    this.newPerson = {firstName: '', lastName: '', email: '', gender: 'male', birthday: ''};
  }

  function setEditedPerson(person) {
    this.editedPerson = angular.copy(person);
    this.isEditing = true;
  }

  function isCurrentPerson(personId) {
    return this.editedPerson !== null && this.editedPerson.id === personId;
  }

  function cancelEditing() {
    this.editedPerson = null;
    this.isEditing = false;
  }

  this.persons = [];
  this.editedPerson = null;
  this.isEditing = false;
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
