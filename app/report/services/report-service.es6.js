export function ReportService(Report, gettext, $rootScope, Shout) {
  return {
    one: (id) => {
      // Need to use findOne() instead of findById() since you can't use the include filter with findById()
      return Report.findById({id: id});
    },
    all: (pageNumber) => {
      return Report.find({
        filter: {
          limit: $rootScope.gemConfig.pagination.pageSize,
          offset: (pageNumber - 1) * $rootScope.gemConfig.pagination.pageSize,
          //order: ['lastName ASC', 'firstName ASC', 'middleName ASC']
        }
      });
    },
    delete: (reportId, cb) => {
      Report.deleteById({id: reportId}).$promise.then(cb);
    },
    trash: (reportId, cb) => {
      Report.trash({id: reportId}).$promise.then(cb);
    },
    save: (reportObj) => {
      Report.upsert({},reportObj).$promise.then(
        (data) => {Shout.success(gettext('Successfully saved report: ') + '"' + data.name + '"');},
        (error) => {Shout.error(gettext(error.data.error.message),error.data.error.name);}
      );
    }
  };
}
