export function NoteService(Note) {
  this.tree = () => {
      return Note.find().$promise
      .then(
          (data) => console.log(data)
        );
  };
  
  this.all = () => {
    return Note.find().$promise;
  };
  
  this.new = () => {
    return new Note();
  };
  
  this.get = (noteId) => {
    return Note.findById({id: noteId}).$promise;
  };
  
  this.save = (note) => {
    return Note.upsert({}, note).$promise;
  };
}
