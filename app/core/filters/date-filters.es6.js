import 'moment';

export function fromNowFilter() {
  return function(date, removeSuffix) {
    return moment(date).fromNow(removeSuffix);
  };
}
