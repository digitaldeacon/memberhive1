function PersonCreateController (Person, $scope) {
  this.createPerson = (person) => {
    Person.create(person, () => {
    });
  };

  $scope.schema = {
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
        enum : ['male', 'female']
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

  $scope.form = [
    '*',
    {
      type: 'submit',
      title: 'Save'
    }
  ];

  $scope.model = {};
  
  $scope.onSubmit = (form) => {
    console.log(form);
    $scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      console.log(form);
    }
  };
}

angular
  .module('gem.person')
  .controller(
    'PersonCreateController',
    PersonCreateController
);
