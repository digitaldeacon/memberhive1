angular.module('personFilters', [])
  .filter('formatFacebookUrl', function() {
    return function(item) {
      return 'https://facebook.com/'+item;
    };
  })
  .filter('formatSkypeUrl', function() {
    return function(item) {
      return 'skype:'+item;
    };
  })
  .filter('formatName', function() {
    return function(person) {
      var ret = person.firstName;
      if (person.middleName)
        ret += ' ' + person.middleName;
      ret += ' ' + person.lastName;
      if (person.nickName)
        ret += ' (' + person.nickName + ')';
      return ret;
    };
  })
  .filter('formatFirstName', function() {
    return function(person) {
      var ret = person.firstName;
      if(person.middleName)
        ret += ' ' + person.middleName;
      if (person.nickName)
        ret += ' (' + person.nickName + ')';
      return ret;
    };
  });
