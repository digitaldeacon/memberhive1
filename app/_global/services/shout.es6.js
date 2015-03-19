'use strict';

var Shout = (gettext,toastr) => {
  return {
    error: msg => {
      toastr.error(gettext(msg),gettext('Error'));
    },
    success: msg => {
      toastr.success(gettext(msg),gettext('Success'));
    },
    info: msg => {
      toastr.info(gettext(msg),gettext('Info'));
    }
  };
};
Shout.$inject = ['gettext','toastr'];
export default Shout;
