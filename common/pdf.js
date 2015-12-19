"use strict";
var _ = require('lodash');
var Toner = require("toner");
var handlebars = require('handlebars');
var moment = require('moment');

module.exports = class Pdf {
  constructor(model) {
    this.model = model;
    this.app = model.app;
    this.registerHelper();
  }

  registerHelper() {
    var that = this.app.get('url');
    handlebars.registerHelper('avatarUrl', function(personId, size) {
      return that+"api/Avatars/"+personId+"/download/m.jpg";
    });

    handlebars.registerHelper('formatDate', function(date, format, locale) {
      try {
        moment.locale(locale);
      } catch(err) {
        moment.locale('en');
      }
      return moment(date).format(format);
    });
  }

  render(html, data, options, res, cb) {
    var template = handlebars.compile(html);
    var result = template(data);

    //console.log(result);

    var toner = Toner();
    toner.engine('none', Toner.noneEngine);
    toner.recipe('phantom', require("toner-phantom")());
    //toner.recipe('wkhtmltopdf', require("toner-wkhtmltopdf")());
    toner.recipe('html', Toner.htmlRecipe);

    var header = options.enableHeader ? options.header : '';
    var footer = options.enableFooter ? options.footer : '';
    var headerHeight = options.enableHeader ? options.headerHeight : 0;
    var footerHeight = options.enableFooter ? options.footerHeight : 0;
    var marginLeft = options.marginLeft || 0;
    var marginRight = options.marginRight || 0;
    var marginTop = options.marginTop || 0;
    var marginBottom = options.marginBottom || 0;
    var pageSize = options.pageSize || 'A5';

    toner.render({
      template: {
        engine: 'none',
        recipe: 'phantom',
        content: result,
        wkhtmltopdf: {
          pageSize: 'A5'
        },
        phantom: {
          header: header,
          footer: footer,
          paperSize: {
            format: pageSize,
            orientation: 'portrait',
            margin: {
              left: marginLeft + 'cm',
              right: marginRight + 'cm',
              top: marginTop + 'cm',
              bottom: marginBottom + 'cm'
            },
            headerHeight: headerHeight + 'cm',
            footerHeight: footerHeight + 'cm'
          }
        }
      }
    }, function(err, out) {
      if (err) {
        cb(new Error(err));
        return;
      }
      out.stream.pipe(res);
      // Callback intentionally not invoked
    });
  }
}



