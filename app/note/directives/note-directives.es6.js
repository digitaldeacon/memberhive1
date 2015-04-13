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
    template: '<input ng-model="{{note.title}}" type="text"/> <br /> <textarea ng-model="{{note.content}}" />'
  };
}


export function NoteTreeDirective() {
  return {
    scope : {
        note : '='
    },
    restrict: 'E',
    template: '<input ng-model="{{note.title}}" type="text"/> <br /> <textarea ng-model="{{note.content}}" /'
  };
}
