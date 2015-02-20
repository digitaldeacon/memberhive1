'use strict'

describe 'Controller: PersonCtrl', ->

  # load the controller's module
  beforeEach module 'gemmiiWebApp'

  PersonCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PersonCtrl = $controller 'PersonCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
