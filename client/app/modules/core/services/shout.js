
export function Shout($mdToast) {
  return {
    message: (msg, icon='info') => {
      $mdToast.show({
          template: `<md-toast><ng-md-icon icon="${icon}" style="fill: white" size="18"></ng-md-icon> &nbsp; ${msg}</md-toast>`,
          position: 'top right',
          hideDelay: 30000
      });
    },
    warning: (msg) => {
      this.message(msg, 'warning');
    },
    error: (msg) => {
      this.message(msg, 'error');
    },
    vError: (err) => {
      if (err.data && err.data.error && err.data.error.message)
        this.message(err.data.error.message, 'error');
    }
  };
}
