var _ = require('lodash');
module.exports = function(MhBase) {
  
  MhBase.searchValue = function(field, text, cb) {
    var personCollection = this.getDataSource().connector.collection(this.modelName);
    personCollection.distinct(field, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        if (text !== undefined) {
          results = _.filter(results, result => _.includes(result, text));
        }
        cb(null, results);
      }
    });
  };
  
  
  MhBase.createRemotes = function() {
    // We need to call the base class's setup method
    //MhBase.base.setup.call(this);
  
    this.remoteMethod(
      'searchValue',
      {
        accepts: [
          {
            arg: 'field',
            type: 'string'
          },
          {
            arg: 'text',
            type: 'string'
          }
        ],
        returns: {
          arg: 'data',
          type: 'array'
        },
        http: {verb: 'get'}
      }
    );
  }
  


};
