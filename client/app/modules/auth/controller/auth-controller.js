export function LoginController (Account, $state, GemAcl, Shout, gettextCatalog) {

  this.rememberMe = true;
  this.error = false;
  this.errorMsg = '';
  this.errorCode = '';
  this.login = () => {
    Account.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password}
    )
    .$promise.then(
      (resp) => {
        this.error = false;
        Account.roles({'user_id': resp.user.id})
          .$promise.then((resp) => {
            GemAcl.setRights(resp.roles);
            $state.go('dashboard');
          });
      },
      (err) => {
        console.log(err);
        if (err.status === 401)
          Shout.error(gettextCatalog.getString('Could not login. Please check your username and password.'));
        else
          Shout.error(gettextCatalog.getString('Could not login. Please check your connection.'));
      }
    );
  };
}
