module.exports = function(Tag) {

  Tag.saveTagsEntity = function(tags, entityId, rowId, cb) {
    tags.forEach(function(tag) {
      /*Tag.findOrCreate(
        {where: {text: tag.text}}
      );*/
      console.log(tag);
      cb(null);
    });
  };

  Tag.remoteMethod(
    'saveTagsEntity',
    {
      http: {path: '/saveTagsEntity', verb: 'put'},
      accepts: [
        {arg: 'tags', type: 'array',required: true},
        {arg: 'entityId', type: 'number',required: true},
        {arg: 'rowId', type: 'number',required: true}
      ],
      returns: {arg: 'status', type: 'string'}
    }
  );

};
