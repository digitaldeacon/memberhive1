var mhConfigValues = function (
  Settings,
  $log
) {"ngInject";

  /**
   * This Service is also in $rootScope as options
   */

  this.values = {};
  this.all = null;
  /**
   * Warning: The key should not contains dots, as mongo won't accept it
   */
  this.set = (section, key, value) => {
    if(_.includes(key, '.')) {
      $log.error("ConfigValues has a key: " + key + " with a dot inside");
      return;
    }
    this.promise.then(() => {
      this.values[section] = this.values[section] || {};
      this.values[section][key] = value;
      console.log(this.all);
      var upmh = _.find(this.all, {name: section});
      upmh = upmh || {name: section};
      upmh.value = value;
      console.log("upsert this", upmh);
      Settings.upsert({}, upmh);
    });
  };

  this.get = (section, key, def = null) => {
    console.log(section, key);
    return this.promise.then(() => {
      console.log(this.values);
      if(!this.values || !this.values[section] || this.values[section][key]) return def;
      console.log("return", this.values[section], key);
      return this.values[section][key];
    });
  };

  this.getData = () => {
    return Settings.find({}).$promise
    .then((data) => {
      this.all = data;
      this.values = _.zipObject(_.map(data, d => d.name), _.map(data, d => d.value));
    });
  };

  this.promise = this.getData();
};

angular.module('mh.settings').service('MhConfigValues', mhConfigValues);
