'use strict';

var process = require('process');
var fs = require('fs');
var path = require('path');
var http2 = require('http2');
var argv = require('optimist').argv;
var root = argv.root || path.normalize(__dirname + "/../");
var jspmRoot = path.normalize(root + "/jspm_packages/");
var filesRoot = path.normalize(root + "/client/app/");
var tmpRoot = path.normalize(root + "/.tmp/");

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
    var url = request.url.split('?')[0];
    var filename = "";
    if(url.indexOf("/jspm_packages/") === 0) {
        filename = path.join(root, url);
        serve(response, filename, jspmRoot);
    } else {
        filename = path.join(filesRoot, url);
        var filenameTmp = path.join(tmpRoot, url);
        if ((filename.indexOf(filesRoot) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
            response.writeHead('200');
            fs.createReadStream(filename).pipe(response);
        } else if ((filenameTmp.indexOf(tmpRoot) === 0) && fs.existsSync(filenameTmp) && fs.statSync(filenameTmp).isFile()) {
            response.writeHead('200');
            fs.createReadStream(filenameTmp).pipe(response);
        } else {
            response.writeHead('404');
            response.end();
        }
    }
}

module.exports = function(grunt) {
  grunt.registerTask(
    'http2_server',
    'Serves the content over http2',
    function() {
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
    });
};
