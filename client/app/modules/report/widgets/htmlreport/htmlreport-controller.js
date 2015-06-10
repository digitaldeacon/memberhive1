export class ReportHtmlController {

  constructor(selectedReport, $sce, apiUrl) {
    this.htmlPreviewURL = $sce.trustAsResourceUrl(`${apiUrl}/Reports/renderHTML?reportId=${selectedReport.id}`);
  }
}

export class ReportHtmlEditController {

  constructor(Report) {
    this.reports = Report.find();
    this.report = null;
  }
}
