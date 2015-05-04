import 'angular-toastr/angular-toastr.min.css!';

export function Shout(toastr,toastrConfig, gettext) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    extendedTimeOut: 1000,
    newestOnTop: true,
    tapToDismiss: true,
    timeOut: 5000,
    templates: {
      toast: '/templates/toast/toast.html',
      progressbar: '/templates/toast/progressbar.html'
    },
  });
  return {
    error: (msg, heading,response) => {
      toastr.error(msg, heading);
    },
    success: (msg, heading,response) => {
      toastr.success(msg, heading);
    },
    info: (msg, heading,response) => {
      toastr.info(msg, heading);
    },
    sError: (message) => {
      toastr.error(message, gettext("Error"));
    },
    vError: (err) => {
      console.log(err);
      if(err.data && err.data.error && err.data.error.message)
        toastr.error(err.data.error.message, gettext("Error"));
    },
    sSuccess: (message) => {
      toastr.success(message, gettext("Success"));
    },
    sInfo: (message) => {
      toastr.info(message, gettext("Info"));
    }
  };
}
