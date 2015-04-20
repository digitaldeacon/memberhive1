var fs = require('fs');
var path = require('path');
var http2 = require('http2');
var argv = require('optimist').argv;
var root = argv.root || path.normalize(__dirname + "/../");
var jspm_root = path.normalize(root + "/jspm_packages/");
var files_root = path.normalize(root + "/client/app/");
var tmp_root = path.normalize(root + "/.tmp/");

function serve(response, filename, root)
{
    if ((filename.indexOf(root) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
        response.writeHead('200');
        fs.createReadStream(filename).pipe(response);
    }
    // Otherwise responding with 404.
    else {
        response.writeHead('404');
        response.end();
    }
}

// The callback to handle requests
function onRequest(request, response) {
    console.log(request.url);
    var url = request.url.split('?')[0]
    if(url.indexOf("/jspm_packages/") === 0) {
        var filename = path.join(root, url);
        serve(response, filename, jspm_root);
    } else {
        var filename = path.join(files_root, url);
        var filename_tmp = path.join(tmp_root, url);
        if ((filename.indexOf(files_root) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
            response.writeHead('200');
            fs.createReadStream(filename).pipe(response);
        } else if ((filename_tmp.indexOf(tmp_root) === 0) && fs.existsSync(filename_tmp) && fs.statSync(filename_tmp).isFile()) {
            response.writeHead('200');
            fs.createReadStream(filename_tmp).pipe(response);
        } else {
            response.writeHead('404');
            response.end();
        }
    }
}


// Creating the server in plain or TLS mode (TLS mode is the default)
var server;
if (argv.plain) {
  server = http2.raw.createServer({}, onRequest);
} else {
  server = http2.createServer({
    key: fs.readFileSync(path.join(__dirname, '../private/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../private/certificate.pem'))
  }, onRequest);
}
server.listen(argv.port || 9000);
