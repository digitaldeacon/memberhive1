set -e
function server() {
    local port="${1:-3000}"
    sleep 1 && chromium-browser "http://localhost:3000" &
    # Set the default Content-Type to `text/plain` instead of `application/octet-stream`
    # And serve everything as UTF-8 (although not technically correct, this doesnâ<80><99>t break anything for binary    files)
    python -c $'import SimpleHTTPServer;\nmap = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map;\nmap[""] =     "text/plain";\nfor key, value in map.items():\n\tmap[key] = value + ";charset=UTF-8";\nSimpleHTTPServer.test();' "$port"
}
rm dist -rf
rm node_modules -rf
rm bower_components -rf
npm install
bower install
gulp build
cd dist/
server
