export class ReportUpsertController {

  constructor($scope, Report, ReportService, Person, gettextCatalog, Shout, $stateParams, QueryBuilderModelService,
              apiUrl, $sce, $document) {
    this.$scope = $scope;
    this.Report = Report;
    this.ReportService = ReportService;
    this.Person = Person;
    this.gettextCatalog = gettextCatalog;
    this.Shout = Shout;
    this.$stateParams = $stateParams;
    this.$document = $document;

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
    this.report.name = this.$scope.reportUpCtrl.report.name;
    this.report.html = this.$scope.reportUpCtrl.report.html;
    this.ReportService.save(this.report).then(() => {
      // Reload iframes
      var iFrame = this.$document.find("#htmlPreviewFrame");
      iFrame.attr("src", iFrame.attr("src"));
      iFrame = this.$document.find("#pdfPreviewFrame");
      iFrame.attr("src", iFrame.attr("src"));
    });
  }

  setBuilderFilters() {
    return this.dataSources.persons;
  }

  generateHTML() {
  }

  generatePDF() {
  }
}
