export function AvatarService(Person, Avatar, Upload, mhConfig) {"ngInject";

  this.dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };

  this.save = (id, file) => {
    return Upload.upload({
        url: mhConfig.apiUrl+"/Avatars/"+id+"/upload",
        file: file,
        fileName: 'avatar.jpg'
      });
  };

  return {
    saveAvatar: (personId, file) => {
      return this.save(personId, file);
    },

    saveAvatarFromDataURI: (personId, file) => {
      return this.save(personId, this.dataURItoBlob(file));
    },

    deleteAvatar: (person) => {
      return Avatar.destroyContainer({container: person.id});
    }

  };
}
