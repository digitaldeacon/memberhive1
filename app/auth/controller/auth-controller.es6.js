function LoginController(User, $location) {
  this.rememberMe = true;
  this.username = '';
  this.password = '';

  this.error = false;
  this.errorMsg = '';
  this.errorCode = '';

  function login() {
    User.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password},
      (val, accessToken) => { //jshint ignore:line
        this.error = false;
        $location.path('/dashboard');
      },
      (err) => {
        this.error = true;
        this.errorMsg = err.data.error.name;
        this.errorCode = err.data.error.code;
      }
    );
  }

  this.login = login;
}

angular.module('gem.auth').controller('LoginController', LoginController);
