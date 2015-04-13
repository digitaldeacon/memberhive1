/**
 * Directive to show edit a note
 *
 * Minimal Usage:
 *   <gem-note-editform />
 */
export function NoteEditFormDirective() {
  return {
    restrict: 'E',
    replace: 'true',
    template: 'Hello <input type="text name="title" /> <br /> <textarea ng-model="" />'
  };
}
