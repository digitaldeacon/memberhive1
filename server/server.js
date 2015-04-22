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
app.post('/htmlToPdf', function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  console.log(req.body.options);
  var wkhtmltopdf = require('wkhtmltopdf', req.body.options);
  var html = '<!doctype html><html><head><title>Test</title><meta charset="utf-8"></head><body>'+req.body.html+'</body></html>';
  wkhtmltopdf(html).pipe(res);
});
app.options('/htmlToPdf', function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});
// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
