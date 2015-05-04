export function LoginController (Account, $state, GemAcl, Shout) {

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
        Shout.vError(err);
      }
    );
  };
}
