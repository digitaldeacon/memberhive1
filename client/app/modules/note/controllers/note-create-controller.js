export function NoteCreateController(NoteService, Note)
{
    this.note = {};

    this.save = () => {
      Note.upsert(this.note);
    };
}
