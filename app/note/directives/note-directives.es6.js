/**
 * Directive to show and edit a note
 *
 * Minimal Usage:
 *   <gem:note-editform />
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

import 'angular-ui-tree/angular-ui-tree.min.css!';
export function NoteTreeDirective() {
  return {
    scope : {
        tree : '='
    },
    restrict: 'E',
    templateUrl: 'note/templates/note-tree-directive.html'
  };
}
