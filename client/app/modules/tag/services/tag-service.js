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
        });
      return tags;
    },
    save: (tagsObj, entityId, rowId) => {
      Tag.saveTagsEntity({"tags": tagsObj, "entityId": entityId, "rowId": rowId});
      /*tagsObj.forEach( tag => {
        tag.siteId = 1;
        console.log(tag);
        Tag.upsert({}, tag).$promise.then(
          (data) => {
            //Shout.success(gettextCatalog.getString('Successfully saved tag “{{name}}”', {name: data.text}));
            var entityObj = {
              tagId: data.id,
              rowId: rowId,
              entityId: entityId
            };
            TagEntity.upsert({},entityObj).$promise.then(data=>{
              console.log('Success');
            });
          },
          (error) => {
            Shout.error(error.data.error.message, error.data.error.name);
          }
        );
      });*/
    }
  };
}
