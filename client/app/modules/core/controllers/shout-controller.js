export function ShoutController($scope, $mdToast) {"ngInject";
  this.closeToast = () => {
    console.log("close toast");
    $mdToast.hide();
  };

}
