"use strict";
var _ = require('lodash');
var Toner = require("toner");
var handlebars = require('handlebars');
var moment = require('moment');

module.exports = class Pdf {
  constructor(model, base) {
    this.base = base;
    this.model = model;
    this.app = model.app;
    this.registerHelper();
  }

  registerHelper() {
    handlebars.registerHelper('avatarUrl', (personId, size) => {
      return this.base+"/Avatars/"+personId+"/download/m.jpg";
    });

    handlebars.registerHelper('formatDate', (date, format, locale) => {
      try {
        moment.locale(locale);
      } catch(err) {
        moment.locale('en');
      }
      return moment.utc(new Date(date)).format(format);
    });
    handlebars.registerHelper('formatDateGerman', (date) => {
      if(!moment.utc(new Date(date)).isValid()) return "";
      return moment.utc(new Date(date)).format("DD.MM.YYYY");
    });
  }

  render(html, data, options, res, cb) {
    var template = handlebars.compile(html);
    var result = template(data);

    var toner = Toner();
    toner.engine('none', Toner.noneEngine);
    toner.recipe('phantom', require("toner-phantom")());
    toner.recipe('html', Toner.htmlRecipe);

    var header = options.enableHeader ? options.header : '';
    var footer = options.enableFooter ? options.footer : '';
    var headerHeight = options.enableHeader ? options.headerHeight : '0cm';
    var footerHeight = options.enableFooter ? options.footerHeight : '0cm';
    var marginLeft = options.marginLeft || '0cm';
    var marginRight = options.marginRight || '0cm';
    var marginTop = options.marginTop || '0cm';
    var marginBottom = options.marginBottom || '0cm';
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
              left: marginLeft,
              right: marginRight,
              top: marginTop,
              bottom: marginBottom
            },
            headerHeight: headerHeight,
            footerHeightd: footerHeight
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



