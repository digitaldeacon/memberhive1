"use strict";
var _ = require('lodash');

module.exports = class Lomongo {
  constructor(model) {
    this.model = model;
    this.collection = model.getDataSource().connector.collection(model.modelName)
    this.connector = model.getDataSource().connector;
    //console.log(this.conn);
  }
  ok(cb, data) {
    console.log(this.connector.fromDatabase(this.model.modelName, data));
    cb(null, {});
  }
}