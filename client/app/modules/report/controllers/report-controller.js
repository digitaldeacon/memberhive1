export class ReportController {

  constructor(ReportService, Report, Shout, gettextCatalog, $state) {
    this.ReportService = ReportService;
    this.Report = Report;
    this.Shout = Shout;
    this.gettextCatalog = gettextCatalog;
    this.$state = $state;

    this.reports = [];
    this.currentPage = 1;
    this.totalReports = 0;

    this.getReports();
  }

  pageChanged(pageNum) {
    this.getReports(pageNum);
  }

  getReports(pageNumber) {
    pageNumber = pageNumber || 1;

    this.Report.count().$promise.then((result) => {
      this.totalReports = result.count;
    });
    this.reports = this.ReportService.all(pageNumber);
  }

  deletePerson(report) {
    this.ReportService.delete(report.id, this.getReports);
  }

  duplicate(report) {
    this.Report.duplicate({reportId: report.id}).$promise.then((resp) => {
      this.Shout.success(this.gettextCatalog.getString('Successfully duplicated report.'));
      this.$state.go('report.edit', {id: resp.result.id});
    });
  }
}
