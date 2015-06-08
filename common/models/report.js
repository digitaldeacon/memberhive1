var jsreport = require('jsreport');

module.exports = function(Report) {

  Report.renderHTML = function(reportId, res, cb) {
    jsreport.render({
      template: {
        content: "<h1>Hello world from {{this.name}}</h1>",
        recipe: "html"
      },
      data: { name: "jsreport" }
    }).then(function(out) {
      out.result.pipe(res);
      // Callback intentionally not invoked
    });
  };
  Report.remoteMethod('renderHTML', {
    accepts: [
      {arg: 'reportId', type: 'string'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    http: {
      verb: 'get'
    }
  });

  Report.renderPDF = function(reportId, res, cb) {
    jsreport.render({
      template: {
        content: "<h1>Hello world from {{this.name}}</h1>",
        recipe: "phantom-pdf"
      },
      data: { name: "jsreport" }
    }).then(function(out) {
      res.type('application/pdf');
      out.result.pipe(res);
      // Callback intentionally not invoked
    });
  };
  Report.remoteMethod('renderPDF', {
    accepts: [
      {arg: 'reportId', type: 'string'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    http: {
      verb: 'get'
    }
  });

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
        type: 'string',
        required: true
      },
      returns: {
        arg: 'result',
        type: 'object'
      }
    }
  );

  Report.trash = function(reportId, cb) {

    // Need to reset the default scope because of https://github.com/strongloop/loopback/issues/1018
    var defaultScope = Report.defaultScope;
    Report.defaultScope = function(){};

    Report.upsert({id: reportId, 'deleted': true}, function(err, obj){
      cb(null, '');
    });

    // Restore the default scope
    Report.defaultScope = defaultScope;
  };
  Report.remoteMethod(
    'trash',
    {
      accepts: {
        arg: 'id',
        type: 'string',
        required: true
      }
    }
  );

};
