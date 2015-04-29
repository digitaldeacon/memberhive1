export class CalendarController {
  constructor($sce) {
    this.$sce = $sce;

    this.calendarUrlInput = "";
    this.calendarUrl = "";
  }

  updateCalendar() {
    this.calendarUrl = this.$sce.trustAsResourceUrl(this.calendarUrlInput);
  }
}
