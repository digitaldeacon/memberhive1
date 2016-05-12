
angular.module('mh.core', []);

angular.module('mh.settings', []);

angular.module('mh.person', [
    'ngFileUpload',
    'uiGmapgoogle-maps',
    'mh.core',
    'mh.address',
    'mh.config',
    'ngJcrop'
]);


angular.module('mh.event', ["materialCalendar"]);
angular.module('mh.note', []);

