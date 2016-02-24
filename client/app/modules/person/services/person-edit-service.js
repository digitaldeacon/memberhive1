export function PersonEditService(
  $q,
  PersonService,
  Person
) {"ngInject";
  this.person = undefined;
  this.account = undefined;


  /*
   * Load Person by person_id.
   * Cached
   */
  this.getPerson = (personId) => {
    return PersonService.one(personId)
      .then((p) => this.person = p);//cache person
  };

  this.save = (person) => {
    return Person.upsert({filter: {include: ['household', 'groups']}}, PersonService.undoMap(person))
      .$promise.then((d) => {return PersonService.mapPerson(d);});
  };

  this.delete = (person) => {
    return Person.deleteById({id: person.id}).$promise;
  };

  this.createAccount = (person, username, password) => {
    return Person.account.create(
      {id: person.id},
      {
        username: username,
        email: person.emails.personal,
        password: password || person.lastName
      }
    ).$promise;
  };


  this.transformBack = (person) => {
    //remove all time information because it is a date
    person.dates = _.mapValues(person.dates, (d) => {
      console.log("transform", d);
      return d;
      /*console.log("pre to string", d);
      if(d instanceof Date) {
        if(isNaN(d)) return "";
        console.log("is date");
        console.log(moment.utc(d).zone(0));
        console.log(moment(d).zone(0));
        console.log(moment(d).zone(0).toISOString());
        console.log(moment.utc(d).zone(0).toISOString());
        d = moment.utc(d).toISOString();
      }
      var split = d.split("T");
      console.log("after split", split[0]);
      return split[0]+"T00:00:00.000Z";*/
    });
    return person;
  };

  this.assign = (item, values, ids, relation, singleton) => {
    var promises = [];
    var used = [];
    values.forEach((value) => {
      if(value.id) {//already a existing group
        if(!_.contains(ids, value.id)) { //not already linked to this person
          promises.push(relation.link({id: item.id, fk: value.id}).$promise);
        }
        used.push(value.id);
      } else {
        promises.push(singleton.create({}, value).$promise.then((newValue) => {//create group
          return relation.link({id: item.id, fk: newValue.id}).$promise; //link to person
        }));
      }
    });

    _.difference(ids, used).forEach((id) => {
      promises.push(relation.unlink({id: item.id, fk: id}).$promise);
    });

    return $q.all(promises).then(() => {return item;});
  };
}
