var siteSettingsController = function (
  MhConfigValues
) {"ngInject";
  console.log("init site settings controller");
  MhConfigValues.get("site4", "ad", "DEFAULT").then(d => this.ad = d);
  MhConfigValues.set("site4", "ad", "ad");
};

angular.module('mh.settings').controller('SiteSettingsController', siteSettingsController);


