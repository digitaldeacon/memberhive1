function LoginController(User) {
  this.asd = "asd";
  function login() {
    User.login(
        {username: this.username, password: this.password},
        (err, accessToken) => {
          console.log(accessToken);
        }
    );
  }
  this.username = "";
  this.password = "";
  this.login = login;
}

angular.module('gem.auth').controller('LoginController', LoginController);
