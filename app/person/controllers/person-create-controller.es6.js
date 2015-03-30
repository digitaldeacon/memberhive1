export class PersonCreateController {

  constructor(Person, $scope, gettext) {
    this.Person = Person;
    this.$scope = $scope;
    this.gettext = gettext;

    this.schema = {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          required: true
        },
        middleName: {
          type: 'string'
        },
        lastName: {
          type: 'string',
          required: true
        },
        nickName: {
          type: 'string'
        },
        prefix: {
          type: 'string'
        },
        suffix: {
          type: 'string'
        },
        gender: {
          type: 'string',
          enum: ['m', 'f']
        },
        birthdate: {
          type: 'string'
        },
        enabled: {
          type: 'checkbox',
          required: true
        }
      }
    };

    this.form = [
      '*',
      {
        type: 'submit',
        title: this.gettext('Save')
      }
    ];

    this.model = {};
  }


  onSubmit(form) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.Person.create(this.model).$promise
      .then(
        (ok) => console.log('created'),
        (err) => console.log('error')
      );
    }
  }
}
