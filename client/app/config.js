System.config({
  "baseURL": "./",
  "defaultJSExtensions": true,
  "transpiler": "babel",
  "babelOptions": {
    "stage": 0,
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "github:*": "../../jspm_packages/github/*",
    "npm:*": "../../jspm_packages/npm/*"
  },
  "buildCSS": false
});

System.config({
  "map": {
    "Sortable": "github:RubaXa/Sortable@1.1.1",
    "adf-structures-base": "github:sdorra/adf-structures-base@master",
    "angular": "github:angular/bower-angular@1.4.1",
    "angular-animate": "github:angular/bower-angular-animate@1.4.1",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.0",
    "angular-breadcrumb": "github:ncuillery/angular-breadcrumb@0.3.3",
    "angular-confirm": "github:Schlogen/angular-confirm@master",
    "angular-cookies": "github:angular/bower-angular-cookies@1.4.1",
    "angular-dashboard-framework": "github:sdorra/angular-dashboard-framework@master",
    "angular-fontawesome": "npm:angular-fontawesome@0.3.1",
    "angular-gettext": "github:rubenv/angular-gettext@2.1.0",
    "angular-loading-bar": "github:chieffancypants/angular-loading-bar@0.7.1",
    "angular-material": "github:angular/bower-material@0.10.0",
    "angular-material-icons": "github:klarsys/angular-material-icons@0.4.0",
    "angular-messages": "npm:angular-messages@1.4.1",
    "angular-moment": "npm:angular-moment@0.10.1",
    "angular-resource": "github:angular/bower-angular-resource@1.4.1",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.1",
    "angular-spinkit": "github:Urigo/angular-spinkit@master",
    "angular-toastr": "github:Foxandxss/angular-toastr@1.2.1",
    "angular-touch": "github:angular/bower-angular-touch@1.4.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "angular-ui-tree": "github:angular-ui-tree/angular-ui-tree@2.5.0",
    "angular-ui/ui-sortable": "github:angular-ui/ui-sortable@0.13.4",
    "angularUtils-pagination": "github:michaelbromley/angularUtils-pagination@0.5.1",
    "babel": "npm:babel-core@5.5.8",
    "babel-runtime": "npm:babel-runtime@5.5.8",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "bootstrap-datepicker": "github:eternicode/bootstrap-datepicker@1.4.0",
    "bootstrap-hover-dropdown": "github:CWSpear/bootstrap-hover-dropdown@2.1.3",
    "codemirror": "github:codemirror/codemirror@5.3.0",
    "core-js": "npm:core-js@0.9.17",
    "css": "github:systemjs/plugin-css@0.1.12",
    "font-awesome": "npm:font-awesome@4.3.0",
    "iso-3166-country-codes-angular": "github:rsertelon/iso-3166-country-codes-angular@1.1.1",
    "jQuery-QueryBuilder": "github:mistic100/jQuery-QueryBuilder@2.1.0",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "lodash": "npm:lodash@3.7.0",
    "moment": "github:moment/moment@2.10.3",
    "ng-file-upload": "github:danialfarid/ng-file-upload@4.2.4",
    "ng-material-floating-button": "npm:ng-material-floating-button@0.6.1",
    "ngImgCrop": "github:alexk111/ngImgCrop@0.3.2",
    "ngTagsInput": "github:lunks/ngTagsInput@3.0.0",
    "nsPopover": "github:nohros/nsPopover@0.6.8",
    "restangular": "github:mgonto/restangular@1.5.1",
    "svg-morpheus": "github:alexk111/SVG-Morpheus@0.1.8",
    "ui-codemirror": "github:angular-ui/ui-codemirror@master",
    "github:angular-ui/bootstrap-bower@0.12.1": {
      "angular": "github:angular/bower-angular@1.2.28"
    },
    "github:angular-ui/ui-codemirror@master": {
      "codemirror": "github:codemirror/codemirror@5.3.0"
    },
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-animate@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-aria@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-cookies@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-sanitize@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-touch@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-material@0.10.0": {
      "angular": "github:angular/bower-angular@1.4.1",
      "angular-animate": "github:angular/bower-angular-animate@1.4.1",
      "angular-aria": "github:angular/bower-angular-aria@1.4.1",
      "css": "github:systemjs/plugin-css@0.1.12"
    },
    "github:components/jqueryui@1.11.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:eternicode/bootstrap-datepicker@1.4.0": {
      "bootstrap": "github:twbs/bootstrap@3.3.5",
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.2.2"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:mgonto/restangular@1.5.1": {
      "angular": "github:angular/bower-angular@1.4.1",
      "lodash": "npm:lodash@3.7.0"
    },
    "github:mistic100/jQuery-QueryBuilder@2.1.0": {
      "bootstrap": "github:twbs/bootstrap@3.3.5",
      "jquery": "github:components/jquery@2.1.4",
      "moment": "npm:moment@2.10.3"
    },
    "github:ncuillery/angular-breadcrumb@0.3.3": {
      "angular-ui-router": "github:angular-ui/ui-router@0.2.15"
    },
    "github:nohros/nsPopover@0.6.8": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:sdorra/angular-dashboard-framework@master": {
      "angular": "github:angular/bower-angular@1.2.28",
      "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.12.1",
      "bootstrap": "github:twbs/bootstrap@3.3.5"
    },
    "github:systemjs/plugin-css@0.1.12": {
      "clean-css": "npm:clean-css@3.1.9",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:amdefine@0.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:angular-moment@0.10.1": {
      "moment": "npm:moment@2.10.3",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.5.8": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.2.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:clean-css@3.1.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.6.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.43",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.6.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.17": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.12"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.7.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:moment@2.10.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

