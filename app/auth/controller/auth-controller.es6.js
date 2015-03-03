function LoginController(User) {
  this.asd = 'asd';
  function login() {
    User.login(
        {rememberMe: this.rememberMe},
        {username: this.username, password: this.password},
        (err, accessToken) => {
          console.log(accessToken);
        }
    );
  }
  this.rememberMe = true;
  this.username = '';
  this.password = '';
  this.login = login;
}

angular.module('gem.auth').controller('LoginController', LoginController);
