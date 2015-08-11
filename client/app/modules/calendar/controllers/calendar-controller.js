export class CalendarController {
  constructor($sce) {
    "ngInject";
    this.$sce = $sce;

    this.calendarUrlInput = "";
    this.calendarUrl = "";
  }

  updateCalendar() {
    this.calendarUrl = this.$sce.trustAsResourceUrl(this.calendarUrlInput);
  }
}
