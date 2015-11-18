export function LoginController (Account, $state, MhAcl, Shout, gettextCatalog) {"ngInject";

  this.rememberMe = true;
  this.login = () => {
    console.log("login");
    Account.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password}
    )
    .$promise.then(
      (resp) => {
        this.error = false;
        Account.roles({'user_id': resp.user.id})
          .$promise.then((resp) => {
            MhAcl.setRights(resp.roles);
            $state.go('dashboard');
          });
      },
      (err) => {
        if (err.status === 401)
          Shout.error(gettextCatalog.getString('Could not login. Please check your username and password.'));
        else
          Shout.error(gettextCatalog.getString('Could not login. Please check your connection.'));
      }
    );
  };
}
