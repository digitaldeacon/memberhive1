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
      }).$promise.then(data => {
          data.forEach(item => {
            item.tag.entityTagId = item.id; //TODO: this must disappear when findOrCreate works for tagService:save
            tags.push(item.tag);
          });
        });
      return tags;
    },
    save: (tagsObj, entityId, rowId) => {
      //Tag.saveTagsEntity(tagsObj, entityId, rowId); //TODO: use findOrCreate at backend
      tagsObj.forEach( tag => {
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
      });
    }
  };
}
