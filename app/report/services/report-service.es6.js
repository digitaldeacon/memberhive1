export function ReportService(Report, gettext, config, Shout) {
  return {
    one: (id) => {
      // Need to use findOne() instead of findById() since you can't use the include filter with findById()
      return Report.findById({id: id});
    },
    all: (pageNumber) => {
      return Report.find({
        filter: {
          limit: config.pagination.pageSize,
          offset: (pageNumber - 1) * config.pagination.pageSize,
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
    upsert: (reportObj) => {
      Report.upsert({},reportObj).$promise.then(
        (data) => {Shout.success(gettext('Successfully created query for report ' + data.name));},
        (error) => {Shout.error(gettext(error.data.error.message),error.data.error.name);}
      );
    }
  };
}
