export var gemConfigModule = angular.module('gem.config', [])

.constant('productName', 'MemberHive')

.constant('mhConfig', configGlobal)

  .constant('NoteIconConfig', [{
      icon: 'chat',
      title: 'Note',
      value: 'note'
    },{
      icon: 'email',
      title: 'Email',
      value: 'email'
    },{
      icon: 'call',
      title: 'Phone',
      value: 'phone'
    },{
      icon: 'group',
      title: 'Meeting',
      value: 'meeting'
    },{
      icon: 'backup',
      title: 'Prayer',
      value: 'prayer'
    },
    ])

;
