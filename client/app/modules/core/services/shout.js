
export function Shout($mdToast) {"ngInject";
  return {
    message: (msg, icon='info') => {
      $mdToast.show({
          template: `<md-toast class="toast-success"><ng-md-icon icon="${icon}" style="fill: white" size="18"></ng-md-icon> &nbsp; ${msg}</md-toast>`,
          position: 'top right',
          hideDelay: 3000
      });
    },
    warning: (msg) => {
      $mdToast.show({
          template: `<md-toast class="toast-warning"><ng-md-icon icon="warning" style="fill: white" size="18"></ng-md-icon> &nbsp; ${msg}</md-toast>`,
          position: 'top right',
          hideDelay: 6000
      });
    },
    error: (msg) => {
      $mdToast.show({
          template: '<md-toast class="toast-error"><ng-md-icon icon="error" style="fill: white" size="18"></ng-md-icon> &nbsp; ' + msg + '</md-toast>',
          position: 'top right',
          hideDelay: 300000
      });
    },
    vError: (err) => {
      var msg = "";
      if (err.data && err.data.error && err.data.error.message)
        msg = err.data.error.message;
      $mdToast.show({
          template: '<md-toast class="toast-error"><ng-md-icon icon="error" style="fill: white" size="18"></ng-md-icon> &nbsp; ' + msg + '</md-toast>',
          position: 'top right',
          hideDelay: 300000
      });

    }
  };
}
