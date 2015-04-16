var loopback = require('loopback');
var boot = require('loopback-boot');
var https = require('https');
var path = require('path');
var fs = require("fs");

var app = module.exports = loopback();
var options = {
  key: fs.readFileSync(path.join(__dirname, '../private/privatekey.pem')).toString(),
  cert: fs.readFileSync(path.join(__dirname, '../private/certificate.pem')).toString()
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  return https.createServer(options, app).listen(app.get('port'), function() {
      var baseUrl = 'https://' + app.get('host') + ':' + app.get('port');
      app.emit('started', baseUrl);
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
