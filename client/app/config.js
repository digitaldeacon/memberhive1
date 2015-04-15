System.config({
  "baseURL": "./",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "../../jspm_packages/github/*.js",
    "npm:*": "../../jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.15",
    "angular-animate": "github:angular/bower-angular-animate@1.3.15",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@master",
    "angular-bootstrap-select": "github:joaoneto/angular-bootstrap-select@master",
    "angular-breadcrumb": "github:ncuillery/angular-breadcrumb@0.3.3",
    "angular-confirm": "github:Schlogen/angular-confirm@master",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.15",
    "angular-dashboard-framework": "github:sdorra/angular-dashboard-framework@0.7.0",
    "angular-fontawesome": "npm:angular-fontawesome@0.3.1",
    "angular-gettext": "github:rubenv/angular-gettext@2.0.5",
    "angular-loading-bar": "github:chieffancypants/angular-loading-bar@0.7.1",
    "angular-moment": "npm:angular-moment@0.9.2",
    "angular-resource": "github:angular/bower-angular-resource@1.3.15",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.3.15",
    "angular-toastr": "github:Foxandxss/angular-toastr@master",
    "angular-touch": "github:angular/bower-angular-touch@1.3.15",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "angular-ui-select": "github:angular-ui/ui-select@0.11.2",
    "angular-ui/bootstrap": "github:angular-ui/bootstrap-bower@master",
    "angular-ui/ui-sortable": "github:angular-ui/ui-sortable@0.13.0",
    "angularUtils-pagination": "github:michaelbromley/angularUtils-pagination@0.5.1",
    "babel": "npm:babel-core@5.1.1",
    "babel-runtime": "npm:babel-runtime@5.1.1",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "bootstrap-datepicker": "github:eternicode/bootstrap-datepicker@1.4.0",
    "bootstrap-hover-dropdown": "github:CWSpear/bootstrap-hover-dropdown@2.1.3",
    "bootstrap-select": "github:silviomoreto/bootstrap-select@master",
    "codemirror": "github:codemirror/CodeMirror@5.1.0",
    "core-js": "npm:core-js@0.8.2",
    "css": "github:systemjs/plugin-css@0.1.9",
    "danialfarid/ng-file-upload": "github:danialfarid/ng-file-upload@3.2.4",
    "font-awesome": "npm:font-awesome@4.3.0",
    "iso-3166-country-codes-angular": "github:rsertelon/iso-3166-country-codes-angular@1.1.1",
    "jQuery-QueryBuilder": "github:mistic100/jQuery-QueryBuilder@2.0.1",
    "jquery": "github:components/jquery@2.1.3",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "lodash": "npm:lodash@3.6.0",
    "moment": "github:moment/moment@2.9.0",
    "ngImgCrop": "github:alexk111/ngImgCrop@0.3.2",
    "ngTagsInput": "github:lunks/ngTagsInput@master",
    "nsPopover": "github:nohros/nsPopover@0.6.7",
    "rangy": "github:timdown/rangy-release@1.2.3",
    "restangular": "github:mgonto/restangular@1.5.1",
    "textAngular": "npm:textangular@1.3.11",
    "github:angular-ui/bootstrap-bower@0.12.0": {
      "angular": "github:angular/bower-angular@1.2.28"
    },
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-animate@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-cookies@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-sanitize@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:angular/bower-angular-touch@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:components/jqueryui@1.11.3": {
      "jquery": "github:components/jquery@2.1.3"
    },
    "github:components/jqueryui@1.11.4": {
      "jquery": "github:components/jquery@1.11.2"
    },
    "github:eternicode/bootstrap-datepicker@1.4.0": {
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "jquery": "github:components/jquery@1.11.2"
    },
    "github:joaoneto/angular-bootstrap-select@master": {
      "angular": "github:angular/bower-angular@1.3.15",
      "bootstrap-select": "github:silviomoreto/bootstrap-select@1.6.4"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.1.2"
    },
    "github:jspm/nodelibs-events@0.1.0": {
      "events-browserify": "npm:events-browserify@0.0.1"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.0",
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
      "angular": "github:angular/bower-angular@1.3.15",
      "lodash": "npm:lodash@3.6.0"
    },
    "github:mistic100/jQuery-QueryBuilder@2.0.1": {
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "jquery": "github:components/jquery@1.11.2",
      "moment": "npm:moment@2.9.0"
    },
    "github:ncuillery/angular-breadcrumb@0.3.3": {
      "angular-ui-router": "github:angular-ui/ui-router@0.2.13"
    },
    "github:sdorra/angular-dashboard-framework@0.7.0": {
      "angular": "github:angular/bower-angular@1.2.28",
      "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.12.0",
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "ui-sortable": "github:angular-ui/ui-sortable@0.13.0",
      "jquery": "github:components/jquery@1.11.2",
      "jquery-ui": "github:components/jqueryui@1.11.3"
    },
    "github:systemjs/plugin-css@0.1.9": {
      "clean-css": "npm:clean-css@3.1.9",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@1.11.2"
    },
    "npm:amdefine@0.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:angular-moment@0.9.2": {
      "moment": "npm:moment@2.9.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.1.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.4",
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
      "events": "github:jspm/nodelibs-events@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.8.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:events-browserify@0.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.9"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:moment@2.9.0": {
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
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:textangular@1.3.11": {
      "angular": "github:angular/bower-angular@1.3.15",
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "font-awesome": "npm:font-awesome@4.3.0",
      "rangy": "github:timdown/rangy-release@1.2.3"
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

