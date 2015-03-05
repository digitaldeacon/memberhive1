function OptionController(Option) {
  var main = this;
  function getOptions() {
    Option.find(result => main.options = result);
  }

  function createOption(option) {
    Option.create(option, () => {
      initCreateForm();
      getOptions();
    });
  }

  function updateOption(optionObj) {
    Option.upsert(optionObj, () => {
      cancelEditing();
      getOptions();
    });
  }

  function deleteOption(optionId) {
    Option.deleteById({id: optionId}, () => {
      cancelEditing();
      getOptions();
    });
  }

  function initCreateForm() {
    main.newOption = {optionName: '', optionValue: ''};
  }

  function setEditedOption(option) {
    main.editedOption = angular.copy(option);
    main.isEditing = true;
  }

  function isCurrentOption(optionId) {
    return main.editedOption !== null && main.editedOption.id === optionId;
  }

  function cancelEditing() {
    main.editedOption = null;
    main.isEditing = false;
  }

  this.options = [];
  this.editedOption = null;
  this.newOption = null;
  this.isEditing = false;
  this.getOptions = getOptions;
  this.createOption = createOption;
  this.updatePerson = updateOption;
  this.deletePerson = deleteOption;
  this.setEditedOption = setEditedOption;
  this.isCurrentOption = isCurrentOption;
  this.cancelEditing = cancelEditing;

  initCreateForm();
  getOptions();
}

angular
  .module('gem.option')
  .controller(
  'OptionController',
  OptionController
);
