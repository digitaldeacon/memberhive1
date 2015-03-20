'use strict';

export function Shout(gettext,toastr,toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    extendedTimeOut: 1000,
    newestOnTop: true,
    tapToDismiss: true,
    timeOut: 5000
  });
  return {
    error: msg => {
      console.log(msg);
      toastr.error(gettext(msg.data.error.message), gettext(msg.data.error.name));
    },
    success: msg => {
      toastr.success(gettext(msg.data.success.message), gettext(msg.data.success.name));
    },
    info: msg => {
      toastr.info(gettext(msg.data.info.message), gettext(msg.data.info.name));
    }
  };
}
