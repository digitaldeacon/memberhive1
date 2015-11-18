export function HouseholdListController (
  resolveHouseholds
) {
    "ngInject";
  this.households = resolveHouseholds;
  console.log(this.households);
}
