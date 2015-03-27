export function PersonService(Person, Contact, Household, Avatar, gettext, config, $upload, apiUrl) {
  return {
    one: (id) => {
      // Need to use findOne() instead of findById() since you can't use the include filter with findById()
      return Person.findOne({
        filter: {
          where: {
            id: id
          },
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
          limit: config.pagination.pageSize,
          offset: (pageNumber - 1) * config.pagination.pageSize,
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

    hasAvatar: (person) => {
      Avatar.getFiles({
        container: person.id
      });
      return true;
    },

    saveAvatar: (person, file) => {
      $upload.upload({
        url: `${apiUrl}Avatars/${person.id}/upload`,
        file: file,
        fileName: 'avatar.jpg'
      });
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
      var contact = [for (contact of person.contacts) if (contact.type === contactType) contact].shift();
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
      'm': gettext('Male'),
      'f': gettext('Female')
    },

    /**
     * A dictionary with translations of the relationTypes table.
     */
    relationTypes: {
      'husband': gettext('Husband'),
      'wife': gettext('Wife'),
      'son': gettext('Son'),
      'daughter': gettext('Daughter'),
      'cousin': gettext('Cousin'),
      'uncle': gettext('Uncle'),
      'aunt': gettext('Aunt'),
      'brother': gettext('Brother'),
      'sister': gettext('Sister'),
      'grandfather': gettext('Grandfather'),
      'grandmother': gettext('Grandmother'),
      'grandson': gettext('Grandson'),
      'granddaughter': gettext('Granddaughter'),
      'mother': gettext('Mother'),
      'father': gettext('Father'),
      'nephew': gettext('Nephew'),
      'niece': gettext('Niece'),
      'motherInLaw': gettext('Mother in Law'),
      'fatherInLaw': gettext('Father in Law'),
      'brotherInLaw': gettext('Brother in Law'),
      'sisterInLaw': gettext('Sister in Law'),
      'sonInLaw': gettext('Son in Law'),
      'daughterInLaw': gettext('Daughter in Law'),
      'stepbrother': gettext('Stepbrother'),
      'stepsister': gettext('Stepsister')
    }

  };
}
