export function OptionController(Option) {
  this.options = [];
  this.editedOption = null;
  this.newOption = null;
  this.isEditing = false;

  this.getOptions = () => {
    Option.find(result => this.options = result);
  };

  this.createOption = (option) => {
    Option.create(option, () => {
      this.initCreateForm();
      this.getOptions();
    });
  };

  this.updateOption = (optionObj) => {
    Option.upsert(optionObj, () => {
      this.cancelEditing();
      this.getOptions();
    });
  };

  this.deleteOption = (optionId) => {
    Option.deleteById({id: optionId}, () => {
      this.cancelEditing();
      this.getOptions();
    });
  };

  this.initCreateForm = () => {
    this.newOption = {optionName: '', optionValue: ''};
  };

  this.setEditedOption = (option) => {
    this.editedOption = angular.copy(option);
    this.isEditing = true;
  };

  this.isCurrentOption = (optionId) => {
    return this.editedOption !== null && this.editedOption.id === optionId;
  };

  this.cancelEditing = () => {
    this.editedOption = null;
    this.isEditing = false;
  };

  this.initCreateForm();
  this.getOptions();
}
