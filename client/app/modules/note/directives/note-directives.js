/**
 * Directive to show and edit a note
 *
 * Minimal Usage:
 *   <gem:note-editform />
 */
export function NoteEditFormDirective() {
  return {
    scope: {
        note: '='
    },
    restrict: 'E',
    templateUrl: 'modules/note/templates/note-edit-form-directive.html'
  };
}

import 'angular-ui-tree/angular-ui-tree.min.css!';
export function NoteTreeDirective() {
  return {
    scope: {
        tree: '='
    },
    restrict: 'E',
    templateUrl: 'modules/note/templates/note-tree-directive.html'
  };
}

export function NoteCreateDirective() {
  return {
    scope: {
        notableId: '@',
        notableType: '@',
        newNote: '&'
    },
    controller: function (Note, Shout, $scope, gettextCatalog) {
      this.create = () => {
        Note.upsert(
          {
            title: this.title,
            content: this.content,
            notableId: $scope.notableId,
            notableType: $scope.notableType
          }).$promise
        .then(
          (data) => {
            Shout.message(gettextCatalog.getString('Note created'));
            $scope.newNote({note:data});
          }
        );
        this.clear();
      };

      this.clear = () => {
        this.title = '';
        this.content = '';
      };
    },
    controllerAs: 'ctrl',
    restrict: 'E',
    templateUrl: 'modules/note/templates/note-create-directive.html'
  };
}


