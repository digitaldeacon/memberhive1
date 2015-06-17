var _ = require('lodash');

var Toner = require("toner");
var Handlebars = require('handlebars');
var moment = require('moment');

module.exports = function(Report) {

  Report.validate('order', orderValidator);
  function orderValidator(err) {
    var directions = ['ASC', 'DESC'];
    if (this.order && this.order.first) {
      if (!this.order.first.property || !_.includes(directions, this.order.first.direction))
        err();
    }
    if (this.order && this.order.second) {
      if (!this.order.second.property || !_.includes(directions, this.order.second.direction))
        err();
    }
  }

  Report.renderHTML = function(reportId, res, cb) {
    Report.render(reportId, res, cb, 'html');
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
    Report.render(reportId, res, cb, 'phantom-pdf');
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

  /**
   * Render the report
   *
   * @param reportId
   * @param res
   * @param cb
   * @param recipe `html` or `phantom-pdf`
   */
  Report.render = function(reportId, res, cb, recipe) {
    Report.findById(reportId, function(err, report) {
      if (err || !report) {
        cb(new Error('Couldn’t find report with id ' + reportId));
        return;
      }

      var order = [];
      if (report.order && report.order.first)
        order.push(`${report.order.first.property} ${report.order.first.direction}`);
      if (report.order && report.order.second)
        order.push(`${report.order.second.property} ${report.order.second.direction}`);

      Report.app.models.Person.find(
        {
          where: report.query,
          order: order
        },
        function(err, persons) {

        // We manually do the handlebars compilation (instead of letting jsreport do the work) to be able to include
        // external libraries (like moment) with helpers

        Handlebars.registerHelper('avatarUrl', function(personId, size) {
          var validSizes = ['xs', 's', 'm', 'l'];
          if (validSizes.indexOf(size) < 0)
            size = 'xs';
          return `${Report.app.baseUrl}/Avatars/${personId}/download/${size}.jpg`;
        });

        Handlebars.registerHelper('formatDate', function(date, format){
          return moment(date).format(format);
        });

        var html = `
          <html>
            <head></head>
            <body>${report.html}</body>
          </html>`;

        var template = Handlebars.compile(html);
        var result = template({persons: persons});

        var toner = Toner();
        toner.engine('none', Toner.noneEngine);
        toner.recipe('html', Toner.htmlRecipe);
        toner.recipe('phantom-pdf', require("toner-phantom")());

        var header = report.pdfOptions.enableHeader ? report.pdfOptions.header : '';
        var footer = report.pdfOptions.enableFooter ? report.pdfOptions.footer : '';
        var headerHeight = report.pdfOptions.enableHeader ? report.pdfOptions.headerHeight : 0;
        var footerHeight = report.pdfOptions.enableFooter ? report.pdfOptions.footerHeight : 0;
        var marginLeft = report.pdfOptions.marginLeft || 0;
        var marginRight = report.pdfOptions.marginRight || 0;
        var marginTop = report.pdfOptions.marginTop || 0;
        var marginBottom = report.pdfOptions.marginBottom || 0;
        var pageSize = report.pdfOptions.pageSize || 'A4';

        toner.render({
          template: {
            engine: 'none',
            recipe: recipe,
            content: result,
            phantom: {
              header: header,
              footer: footer,
              paperSize: {
                format: pageSize,
                margin: {
                  left: marginLeft + 'cm',
                  right: marginRight + 'cm',
                  top: marginTop + 'cm',
                  bottom: marginBottom + 'cm'
                },
                orientation: report.pdfOptions.orientation,
                headerHeight: headerHeight + 'cm',
                footerHeight: footerHeight + 'cm'
              }
            }
          },
          options: {}
        }, function(err, out) {
          if (err) {
            cb(new Error(err));
            return;
          }
          out.stream.pipe(res);
          // Callback intentionally not invoked
        });
      });
    });
  };

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
