/**
 * Directive to show edit a note
 *
 * Minimal Usage:
 *   <gem-note-editform />
 */
export function NoteEditFormDirective() {
  return {
    scope : {
        note : '='
    },
    restrict: 'E',
    templateUrl: 'note/templates/note-edit-form-directive.html'
  };
}


export function NoteTreeDirective() {
  return {
    scope : {
        tree : '='
    },
    restrict: 'E',
    templateUrl: 'note/templates/note-tree-directive.html'
  };
}
