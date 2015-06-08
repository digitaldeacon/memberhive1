export class ReportUpsertController {

  constructor($scope, Report, ReportService, Person, gettextCatalog, Shout, $stateParams, QueryBuilderModelService,
              apiUrl, $sce) {
    this.$scope = $scope;
    this.Report = Report;
    this.ReportService = ReportService;
    this.Person = Person;
    this.gettextCatalog = gettextCatalog;
    this.Shout = Shout;
    this.$stateParams = $stateParams;

    this.report = this.getReport();
    this.htmlPreviewURL = $sce.trustAsResourceUrl(`${apiUrl}/Reports/renderHTML?reportId=${this.$stateParams.id}`);
    this.pdfPreviewURL = $sce.trustAsResourceUrl(`${apiUrl}/Reports/renderPDF?reportId=${this.$stateParams.id}`);

    $scope.reportHtml = '';

    this.editorOptions = {
      lineWrapping: true,
      mode: 'htmlmixed'
    };


    this.dataSources = {};
    this.dataSources.persons = QueryBuilderModelService.getModel(this.Person);
  }

  getReport() {
    return this.$stateParams.id ? this.ReportService.one(this.$stateParams.id) : null;
  }

  saveReport() {
    console.log("Save report");
    this.report.name = this.$scope.reportUpCtrl.report.name;
    this.report.html = this.$scope.reportUpCtrl.report.html;
    this.ReportService.save(this.report);
  }

  setBuilderFilters() {
    return this.dataSources.persons;
  }

  generateHTML() {
  }

  generatePDF() {
  }
}
