export class PersonStatsController {

  constructor(Person, Household) {
    this.Person = Person;
    this.Household = Household;

    this.personCount = 0;
    this.householdCount = 0;

    this.getCount();
  }

  getCount() {
    this.Person.count().$promise.then((data) => {
      this.personCount = data.count;
    });

    this.Household.count().$promise.then((data) => {
      this.householdCount = data.count;
    });
  }

}
