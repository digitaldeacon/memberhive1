export function QueryBuilderModelService(Person) {
  return {
    personModel: () => {
      var qbModel = [];
      for (var property in Person.model.properties) {
        if (!Person.model.properties.hasOwnProperty(property))
          continue;
        let prop = Person.model.properties[property];

        // Add only properties which have the `queryBuilder` section
        if (!prop.hasOwnProperty('queryBuilder'))
          continue;

        let result = prop.queryBuilder;
        // Mix in property name and type
        result.id = property;
        if (!result.hasOwnProperty('type')) // Use Loopback type unless explicitly specified
          result.type = prop.type;

        if (result.type === 'date') {
          result.validation = {format: 'YYYY/MM/DD'};
          result.plugin = 'datepicker';
          result.plugin_config = { // jshint ignore:line
            format: 'yyyy/mm/dd',
              todayBtn: 'linked',
              todayHighlight: true,
              autoclose: true
          };
        }


        qbModel.push(result);
      }
      console.log(qbModel);
      return qbModel;
    }
  };
}
