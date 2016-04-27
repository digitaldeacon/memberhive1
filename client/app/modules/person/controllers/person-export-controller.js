var personExportController = function (resolveQueryModel) {"ngInject";
  this.queryModel = resolveQueryModel;
  console.log("queryModel", this.queryModel);
};
angular.module('mh.person').controller('PersonExportController', personExportController);
