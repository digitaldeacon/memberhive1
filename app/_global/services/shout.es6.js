export function Shout(gettext,toastr,toastrConfig) {
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
      toastr.error(gettext(h), gettext(txt));
    },
    success: (h,txt,response) => {
      toastr.success(gettext(h), gettext(txt));
    },
    info: (h,txt,response) => {
      toastr.info(gettext(h), gettext(txt));
    }
  };
}
