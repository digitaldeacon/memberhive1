function LoginController(Account, $location, GemAcl) {
  function login() {
    Account.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password},
      (val,key) => {
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
  this.rememberMe = true;
  this.username = '';
  this.password = '';
  this.login = login;
  
  this.error = false;
  this.errorMsg = '';
  this.errorCode = '';
}

angular.module('gem.auth', []).controller('LoginController', LoginController);
