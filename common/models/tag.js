var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'gem.tag'});

module.exports = function(Tag) {

  Tag.search = function(value, cb) {
    Tag.app.models.TagEntity.find({
      where: {text: {like: `%${value}%`}},
      limit: 10
    }, function(err, tags) {
      cb(null, tags);
    });
  };

  Tag.saveTagsEntity = function(tags, entityId, rowId, cb) {
    Tag.app.models.TagEntity.destroyAll({
          and: [
            {rowId: rowId},
            {entityId: entityId}
          ]
      },
      function(err, info) {
        tags.forEach(function(tag) {
          Tag.findOrCreate(
            {where: {text: tag.text}}, //find
            {text: tag.text}, //create
            function(err, tagData, created) {
              if (err) {
                console.error('err', err);
              }
              /*(created) ? log.info('created Tag', tagData.text)
                : log.info('found Tag', tagData.text);*/
              Tag.app.models.TagEntity.findOrCreate(
                {where: {
                  and: [
                    {tagId: tagData.id},
                    {rowId: rowId},
                    {entityId: entityId}
                  ]}
                }, //find
                {
                  tagId: tagData.id,
                  rowId: rowId,
                  entityId: entityId
                }, //create
                function(err, result, created) {
                  if (err) {
                    console.error('err', err);
                  }
                  /*(created) ? log.info('created Tag relation', result)
                    : log.info('found Tag relation', result);*/
                }
              );
            }
          );
        });
        cb(null);
      });
  };

  Tag.remoteMethod(
    'saveTagsEntity',
    {
      http: {path: '/saveTagsEntity', verb: 'put'},
      accepts: [
        {arg: 'tags', type: 'array',required: true},
        {arg: 'entityId', type: 'string',required: true},
        {arg: 'rowId', type: 'number',required: true}
      ],
      returns: {arg: 'status', type: 'string'}
    }
  );

  Tag.remoteMethod(
    'search',
    {
      accepts: {
        arg: 'value',
        type: 'string',
        required: true
      },
      returns: {
        arg: 'results',
        type: 'array'
      }
    }
  );

};
