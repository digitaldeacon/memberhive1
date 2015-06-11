var jsreport = require('jsreport');
var Handlebars = require('handlebars');
var moment = require('moment');

module.exports = function(Report) {

  Report.renderHTML = function(reportId, res, cb) {
    Report.findById(reportId, function(err, report) {
      if (err || !report) {
        cb('Couldn’t find report with id ' + reportId);
        return;
      }
      Report.app.models.Person.find({where: report.query}, function(err, persons) {

        // We manually do the handlebars compilation (instead of letting jsreport do the work) to be able to include
        // external libraries with helpers

        Handlebars.registerHelper('avatarUrl', function(personId, size) {
          var validSizes = ['xs', 's', 'm', 'l'];
          if (validSizes.indexOf(size) < 0)
            size = 'xs';
          return `${Report.app.baseUrl}/Avatars/${personId}/download/${size}.jpg`;
        });

        Handlebars.registerHelper('formatDate', function(date, format){
          return moment(date).format(format);
        });

        var template = Handlebars.compile(report.html);
        var result = template({persons: persons});

        jsreport.render({
          template: {
            content: result,
            recipe: 'html'
          }
        }).then(function(out) {
          out.result.pipe(res);
          // Callback intentionally not invoked
        });
      });
    });
  };
  Report.remoteMethod('renderHTML', {
    accepts: [
      {arg: 'reportId', type: 'string', required: true},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    http: {
      verb: 'get'
    }
  });

  Report.renderPDF = function(reportId, res, cb) {
    Report.findById(reportId, function(err, report) {
      Report.app.models.Person.find({where: report.query}, function(err, persons) {
        jsreport.render({
          template: {
            content: report.html,
            recipe: 'phantom-pdf'
          },
          data: {persons: persons}
        }).then(function(out) {
          out.result.pipe(res);
          // Callback intentionally not invoked
        });
      });
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
