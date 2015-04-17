export function TagService(Tag, TagEntity, Shout, gettextCatalog) {

  return {
    load: () => {
      return Tag.find().$promise;
    },
    getTags: (entity,id) => {
      var tags = [];
      TagEntity.find({filter: {
        where: {
          entityId: entity,
          rowId: id
        },
        include: ['tag']
      }
      }).$promise.then(data => {
          data.forEach(item => {
            tags.push(item.tag);
          });
          return tags;
        });
      return tags;
    },
    save: (tagsObj, entityId, rowId) => {
      Tag.saveTagsEntity({"tags": tagsObj, "entityId": entityId, "rowId": rowId});
    }
  };
}
