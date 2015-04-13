export function NoteService(Note) {
    return {
        noteTree: () => {
            var notes = Note.find();
            console.log(notes);
            return notes;
        }
    };
}
