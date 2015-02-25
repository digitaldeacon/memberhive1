var controllers = {};

controllers.LoginController = function(User)
{
  function login(username, password) {
    User.login(
        {username: username, password: password},
        (err, accessToken) => {
          console.log(accessToken);
        }
    );
  }

  this.login = login;
}

angular.module('gem.auth').controller(controllers);
