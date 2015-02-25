function LoginController(User) {
  function login() {
    User.login(
        {rememberMe: this.rememberMe},
        {username: this.username, password: this.password},
        (err, accessToken) => {
          console.log(accessToken);
        }
    );
  }
  this.username = "";
  this.password = "";
  this.rememberMe = true;
  this.login = login;
}

angular.module('gem.auth').controller('LoginController', LoginController);
