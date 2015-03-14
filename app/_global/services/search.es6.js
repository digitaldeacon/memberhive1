/**
 * Service ES6 Style
 * http://cameronjroe.com/code/angular-movie-search/
 */

'use strict';

var SearchService = ($q, $rootScope, $filter, Person) => {

  return {
    models: ['all','person'],
    all: [],
    person: [],
    findPerson() {
      Person.find().$promise.then(function(response) {
        return response;
      });
    },
    findByComponent(component,val) {
      var arr = [];
      if (component && this.models[component]) {
        if (component==='person') {
          arr = this.findPerson();
        }
      }
      console.log(val);
      console.log(component);
      console.log(arr);
      if (!val) return arr;
      return $filter('filter')(arr,val);
    }
  };
};

SearchService.$inject = ['$q', '$rootScope', '$filter', 'Person'];

export default SearchService;
