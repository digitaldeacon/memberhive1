export class HouseholdListController {

  constructor(PersonService, Household) {
    this.PersonService = PersonService;
    this.Household = Household;

    this.households = [];
    this.currentPage = 1;
    this.totalHouseholds = 0;

    this.getHouseholds();
  }

  pageChanged(pageNum) {
    this.getHouseholds(pageNum);
  }

  getHouseholds(pageNumber) {
    pageNumber = pageNumber || 1;

    this.Household.count().$promise.then((result) => {
      this.totalHouseholds = result.count;
    });
    this.households = this.PersonService.getHouseholds(pageNumber);
  }

  deleteHousehold(household) {
    this.Household.trash({id: household.id}, () => {
      this.getHouseholds();
    });
  }

}
