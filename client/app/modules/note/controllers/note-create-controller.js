export function NoteCreateController(NoteService, Note) {"ngInject";
    this.note = {};

    this.save = () => {
      Note.upsert(this.note);
    };
}
