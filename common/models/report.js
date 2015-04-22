module.exports = function(Report) {

  Report.duplicate = function(reportId, cb) {
    Report.findById(reportId, function(err, reportInstance) {
      reportInstance.id = null;
      reportInstance.createdAt = Date.now();
      Report.create(reportInstance, function(err, instance) {
        cb(null, instance);
      });
    });
  };

  Report.remoteMethod(
    'duplicate',
    {
      accepts: {
        arg: 'reportId',
        type: 'number',
        required: true
      },
      returns: {
        arg: 'result',
        type: 'object'
      }
    }
  );

};
