export function TagService(Tag, TagEntity, Shout, gettextCatalog) {
  var tags = [];
  return {
    load: () => {
      return Tag.find().$promise;
    },
    getTags: (entity,id) => {
      TagEntity.find({filter: {
        where: {
          entityId: entity,
          rowId: id
        },
        include: ['tag']
      }
      }).$promise.then(data => {data.forEach(item => {tags.push(item.tag);});});
      return tags;
    },
    save: (tagsObj, entityId, rowId) => {
      console.log(tagsObj);
      Tag.saveTagsEntity(angular.toJson(tagsObj), entityId, rowId);
      /*Tag.upsert({},tagObj).$promise.then(
        (data) => {Shout.success(gettextCatalog.getString('Successfully saved tag “{{name}}”', {name: data.name}));},
        (error) => {Shout.error(error.data.error.message, error.data.error.name);}
      );*/
    }
  };
}
