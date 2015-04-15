export function TagService($q, Tag) {
  return {
    load: (entity,id) => {
      var deferred = $q.defer();
      var tags = [
        { 'text': 'Tag1' },
        { 'text': 'Tag2' }
      ];
      deferred.resolve(tags);
      return deferred.promise;
    }
  };
}
