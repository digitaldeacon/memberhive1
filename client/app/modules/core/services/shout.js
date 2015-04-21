import 'angular-toastr/angular-toastr.min.css!';

export function Shout(toastr,toastrConfig, gettext) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    extendedTimeOut: 1000,
    newestOnTop: true,
    tapToDismiss: true,
    timeOut: 5000
  });
  // h= heading, txt= message, response= data object (optional) for saving to log
  return {
    error: (h,txt,response) => {
      toastr.error(h, txt);
    },
    success: (h,txt,response) => {
      toastr.success(h, txt);
    },
    info: (h,txt,response) => {
      toastr.info(h, txt);
    },
    sError: (message) => {
        toastr.error(gettext("Error"), message);
    },
    sSuccess: (message) => {
      toastr.success(gettext("Success"), message);
    },
    sInfo: (message) => {
      toastr.info(gettext("Info"), message);
    }
  };
}
