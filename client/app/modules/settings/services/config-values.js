var configValues = function (
  Settings,
  $log
) {"ngInject";

  /**
   * This Service is also in $rootScope as options
   */

  this.values = null;
  /**
   * Warning: The key should not contains dots, as mongo won't accept it
   */
  this.set = (key, value) => {
    if(_.includes(key, '.')) {
      $log.error("AccountOptions has a key: " + key + " with a dot inside");
      return;
    }
    this.promise.then(() => {
      if(this.values.options === undefined) {
        this.values.options = {};
      }
      this.values[key] = value;
      Settings.update({}, this.values);
    });
  };

  this.get = (key, def = null) => {
    return this.promise.then(() => {
      if(!this.valzes || !this.values[key]) return def;
      return this.values[key];
    });
  };

  this.getData = () => {
    return Settings.find({}).$promise
    .then((data) => this.values = data);
  };

  this.promise = this.getData();
};

angular.module('mh.settings').service('ConfigValues', configValues);
