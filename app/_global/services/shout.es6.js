import 'angular-toastr/dist/angular-toastr.min.css!';

export function Shout(toastr,toastrConfig) {
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
    }
  };
}
