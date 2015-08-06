"use strict";
var _ = require('lodash');

module.exports = class Lomongo {
  
  constructor(model) {
    this.model = model;
    this.collection = model.getDataSource().connector.collection(model.modelName)
    this.connector = model.getDataSource().connector;
  }
  
  ok(cb, data) {
    this.callback(cb, null, data);
  }
  
  error(cb, err) {
    this.callback(cb, err, null);
  }
  
  callback(cb, err, data) {
    cb(err, this.connector.fromDatabase(this.model.modelName, data));
  }
}