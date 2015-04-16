export function NoteService(Note) {
    this.tree = () => {
       return Note.find().$promise
        .then(
           (data) => console.log(data)
         );
    };
}
