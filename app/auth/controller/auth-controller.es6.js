function LoginController(User, $location) {
  function login() {
    User.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password},
      (val, accessToken) => {
        this.error = false;
        $location.path("/dhasboard");
      },
      (err) => {
        this.error = true;
        this.error_msg = err.data.error.name;
        this.error_code = err.data.error.code;
      }
    );
  }
  this.rememberMe = true;
  this.username = '';
  this.password = '';
  this.login = login;
  
  this.error = false;
  this.error_msg = "";
  this.error_code = "";
}

angular.module('gem.auth').controller('LoginController', LoginController);
