System.config({
  "baseURL": "scripts/",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "github:*": "../jspm_packages/github/*.js",
    "npm:*": "../jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "CWSpear/bootstrap-hover-dropdown": "github:CWSpear/bootstrap-hover-dropdown@2.1.3",
    "Schlogen/angular-confirm": "github:Schlogen/angular-confirm@master",
    "angular": "github:angular/bower-angular@1.3.15",
    "angular-animate": "github:angular/bower-angular-animate@1.3.15",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@master",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.15",
    "angular-fontawesome": "npm:angular-fontawesome@0.3.1",
    "angular-moment": "npm:angular-moment@0.9.2",
    "angular-resource": "github:angular/bower-angular-resource@1.3.15",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.3.15",
    "angular-touch": "github:angular/bower-angular-touch@1.3.15",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "angular-ui-select": "github:angular-ui/ui-select@0.11.2",
    "angular-ui/bootstrap": "github:angular-ui/bootstrap@master",
    "angular-ui/ui-sortable": "github:angular-ui/ui-sortable@0.13.3",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "joaoneto/angular-bootstrap-select": "github:joaoneto/angular-bootstrap-select@0.0.5",
    "jquery": "github:components/jquery@2.1.3",
    "lodash": "npm:lodash@3.5.0",
    "lodash-es": "npm:lodash-es@3.4.0",
    "michaelbromley/angularUtils-pagination": "github:michaelbromley/angularUtils-pagination@0.5.1",
    "mistic100/jQuery-QueryBuilder": "github:mistic100/jQuery-QueryBuilder@1.4.2",
    "mistic100/microevent.js": "github:mistic100/microevent.js@2.1.0",
    "moment": "github:moment/moment@2.9.0",
    "nohros/nsPopover": "github:nohros/nsPopover@0.6.7",
    "rangy": "github:timdown/rangy-release@1.2.3",
    "restangular": "github:mgonto/restangular@1.4.0",
    "rsertelon/iso-3166-country-codes-angular": "github:rsertelon/iso-3166-country-codes-angular@1.1.1",
    "rubenv/angular-gettext": "github:rubenv/angular-gettext@2.0.3",
    "sdorra/angular-dashboard-framework": "github:sdorra/angular-dashboard-framework@0.7.0",
    "textangular": "npm:textangular@1.3.11",
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
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular-moment@0.9.2": {
      "moment": "npm:moment@2.9.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:lodash@3.5.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:moment@2.9.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:textangular@1.3.11": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

