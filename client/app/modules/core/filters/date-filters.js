import 'moment';

export function fromNowFilter() {
  return function(date, removeSuffix) {
    if (!date)
      return '';
    return moment(date).fromNow(removeSuffix);
  };
}
