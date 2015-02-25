angular
  .module('gemmiiWebApp')
  .controller(
  'PersonCtrl',
  function ($scope, Person) {
    var main = this;

    function getPersons() {
      Person.find(
        function (result) {
          main.persons = result;
        });
    }

    function createPerson(person) {
      Person.create(person,
        function () {
          initCreateForm();
          getPersons();
        });
    }

    function updatePerson(person) {
      Person.upsert(person,
        function () {
          cancelEditing();
          getPersons();
        });
    }

    function deletePerson(personId) {
      Person.deleteById({id: personId},
        function () {
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

    main.persons = [];
    main.editedPerson = null;
    main.isEditing = false;
    main.getPersons = getPersons;
    main.createPerson = createPerson;
    main.updatePerson = updatePerson;
    main.deletePerson = deletePerson;
    main.setEditedPerson = setEditedPerson;
    main.isCurrentPerson = isCurrentPerson;
    main.cancelEditing = cancelEditing;

    initCreateForm();
    getPersons();
  }
);
