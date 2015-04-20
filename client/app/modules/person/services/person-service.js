export function PersonService(Person, Contact, Household, Avatar, LoopBackAuth, gettextCatalog,
                              $upload, apiUrl, $rootScope) {
  return {
    modelName: () => {
      return Person.model.name;
    },

    currentUser: () => {
      return Person.findById({id: LoopBackAuth.currentUserId});
    },

    one: (id) => {
      return Person.findById({
        id: id,
        filter: {
          include: [
            'contacts',
            'account',
            {
              'household': [
                {'persons': 'relationType'},
                'address'
              ]
            },
            'ministries',
            'relationType',
            'addresses'
          ]
        }
      });
    },

    all: (pageNumber) => {
      return Person.find({
        filter: {
          limit: $rootScope.gemConfig.pagination.pageSize,
          offset: (pageNumber - 1) * $rootScope.gemConfig.pagination.pageSize,
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
          include: [
            'contacts',
            'account',
            {
              'household': {'persons': 'relationType'}
            },
            'ministries',
            'relationType'
          ]
        }
      });
    },

    saveAvatar: (person, file) => {
      $upload.upload({
        url: `${apiUrl}Avatars/${person.id}/upload`,
        file: file,
        fileName: 'avatar.jpg'
      });
    },

    deleteAvatar: (person) => {
      Avatar.destroyContainer({container: person.id});
    },

    delete: (personId, cb) => {
      Person.trash({id: personId}).$promise.then(cb);
    },

    /**
     * Return a list of available Households
     */
    getHouseholds: () => {
      return Household.find();
    },

    /**
     * Filter person.contacts by given `contactType` and return first occurence
     */
    getContacts: (person, contactType) => {
      if (!person.contacts)
        return '';
      // ES7 Array comprehensions are supported by Babel transpiler, but not by espree, which is used for
      // gettextCatalog.getString extraction. Thus, no strings are extracted from this file.
      // We can switch back to ES7 array comprehensions once this is fixed: https://github.com/eslint/espree/issues/125
      //var contact = [for (contact of person.contacts) if (contact.type === contactType) contact].shift();
      var contact = person.contacts.filter((contact) => {return contact.type === contactType;}).shift();
      if (contact === undefined) {
        contact = new Contact();
        contact.type = contactType;
        contact.personId = person.id;
        person.contacts.push(contact);
      }
      return contact;
    },

    /**
     * A dictionary with gender translations
     */
    genders: {
      'm': gettextCatalog.getString('Male'),
      'f': gettextCatalog.getString('Female')
    },

    /**
     * A dictionary with translations of the relationTypes table.
     */
    relationTypes: {
      'husband': gettextCatalog.getString('Husband'),
      'wife': gettextCatalog.getString('Wife'),
      'son': gettextCatalog.getString('Son'),
      'daughter': gettextCatalog.getString('Daughter'),
      'cousin': gettextCatalog.getString('Cousin'),
      'uncle': gettextCatalog.getString('Uncle'),
      'aunt': gettextCatalog.getString('Aunt'),
      'brother': gettextCatalog.getString('Brother'),
      'sister': gettextCatalog.getString('Sister'),
      'grandfather': gettextCatalog.getString('Grandfather'),
      'grandmother': gettextCatalog.getString('Grandmother'),
      'grandson': gettextCatalog.getString('Grandson'),
      'granddaughter': gettextCatalog.getString('Granddaughter'),
      'mother': gettextCatalog.getString('Mother'),
      'father': gettextCatalog.getString('Father'),
      'nephew': gettextCatalog.getString('Nephew'),
      'niece': gettextCatalog.getString('Niece'),
      'motherInLaw': gettextCatalog.getString('Mother in Law'),
      'fatherInLaw': gettextCatalog.getString('Father in Law'),
      'brotherInLaw': gettextCatalog.getString('Brother in Law'),
      'sisterInLaw': gettextCatalog.getString('Sister in Law'),
      'sonInLaw': gettextCatalog.getString('Son in Law'),
      'daughterInLaw': gettextCatalog.getString('Daughter in Law'),
      'stepbrother': gettextCatalog.getString('Stepbrother'),
      'stepsister': gettextCatalog.getString('Stepsister')
    }

  };
}
