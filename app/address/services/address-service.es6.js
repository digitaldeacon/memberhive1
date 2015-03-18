export function AddressService(gettext) {

  return {

    /**
     * A dictionary with translations of the address types.
     */
    addressTypes: {
      'home': gettext('Home Address'),
      'work': gettext('Work Address'),
      'postal': gettext('Postal Address')
    }

  };
}
