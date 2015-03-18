export function PersonCreateController(Person, $scope, gettext) {
  var vm = this;
  vm.schema = {
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

  vm.form = [
    '*',
    {
      type: 'submit',
      title: gettext('Save')
    }
  ];

  vm.model = {};

  vm.onSubmit = (form) => {
    $scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      Person.create(vm.model).$promise
      .then(
        (ok) => console.log('created'),
        (err) => console.log('error')
      );
    }
  };
}
