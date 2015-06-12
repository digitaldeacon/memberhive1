export function ReportService(Report, gettextCatalog, $rootScope, Shout) {
  return {
    one: (id) => {
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

    trash: (reportId, cb) => {
      Report.trash({id: reportId}).$promise.then(cb);
    },

    save: (reportObj) => {
      var p = Report.upsert({},reportObj).$promise;
      p.then(
        (data) => {
          Shout.success(gettextCatalog.getString('Successfully saved report “{{name}}”', {name: data.name}));
        },
        (error) => {Shout.error(error.data.error.message, error.data.error.name);}
      );
      return p;
    }
  };
}
