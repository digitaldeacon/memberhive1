export function NoteListController(NoteService)
{
    this.tree = NoteService.tree();
}