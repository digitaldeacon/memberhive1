export function NoteEditController(
  NoteService, 
  Note, 
  resolveNote,
  Shout,
  $state
) {"ngInject";
  this.note = resolveNote;

  this.save = () => {
    NoteService.save(this.note)
      .then(() => Shout.success("Note saved"),
            (err) => Shout.vError(err));
  };
  
  this.close = () => {
    $state.go('note.list');
  };
}
