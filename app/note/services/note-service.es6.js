export function NoteService(Note) {
    return {
        noteTree: () => {
            var notes = Note.find();
            return notes;
        }
    };
}
