var siteSettingsController = function (
  ConfigValues
) {"ngInject";
  ConfigValues.get("ad");
};

angular.module('mh.settings').controller('SiteSettingsController', siteSettingsController);
