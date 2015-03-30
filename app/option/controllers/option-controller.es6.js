export class OptionController {

  constructor(Option) {
    this.Option = Option;

    this.options = [];
    this.editedOption = null;
    this.newOption = null;
    this.isEditing = false;

    this.initCreateForm();
    this.getOptions();
  }

  getOptions() {
    this.Option.find(result => this.options = result);
  }

  createOption(option) {
    this.Option.create(option, () => {
      this.initCreateForm();
      this.getOptions();
    });
  }

  updateOption(optionObj) {
    this.Option.upsert(optionObj, () => {
      this.cancelEditing();
      this.getOptions();
    });
  }

  deleteOption(optionId) {
    this.Option.deleteById({id: optionId}, () => {
      this.cancelEditing();
      this.getOptions();
    });
  }

  initCreateForm() {
    this.newOption = {optionName: '', optionValue: ''};
  }

  setEditedOption(option) {
    this.editedOption = angular.copy(option);
    this.isEditing = true;
  }

  isCurrentOption(optionId) {
    return this.editedOption !== null && this.editedOption.id === optionId;
  }

  cancelEditing() {
    this.editedOption = null;
    this.isEditing = false;
  }
}
