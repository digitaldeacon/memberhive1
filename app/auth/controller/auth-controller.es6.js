export function LoginController(Account, $state, GemAcl) {
  function login() {
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
        this.error = true;
        this.errorMsg = err.data.error.name;
        this.errorCode = err.data.error.code;
      }
    );
  }

  this.rememberMe = true;
  this.login = login;
  this.error = false;
}
