
export function Shout(gettext, $mdToast) {
  return {
    message: (msg) => {
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position('top right')
          .hideDelay(3000)
      );
    },
    vError: (err) => {
      if (err.data && err.data.error && err.data.error.message)
        this.message(err.data.error.message);
    }
  };
}
