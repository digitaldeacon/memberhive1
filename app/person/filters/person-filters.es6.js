angular.module('personFilters', [])
  .filter('formatFacebookUrl', function() {
    return function(item) {
      return `https://facebook.com/${item}`;
    };
  })
  .filter('formatSkypeUrl', function() {
    return function(item) {
      return `skype:${item}`;
    };
  })
  .filter('formatName', function() {
    return function(person) {
      if (person.nickName)
        return `${person.nickName} ${person.lastName}`;
      return `${person.firstName} ${person.middleName} ${person.lastName}`;
    };
  })
  .filter('formatFirstName', function() {
    return function(person) {
      if (person.nickName)
        return person.nickName;
      return `${person.firstName} ${person.middleName}`;
    };
  });
