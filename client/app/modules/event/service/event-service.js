export function EventService(Event) {"ngInject";
  this.all = () => {
    return Event.find().$promise;
  };

  this.new = (date) => {
    var event = new Event();
    event.date = date || new Date();
    return event;
  };

  this.get = (eventId) => {
    return Event.findById({id: eventId}).$promise;
  };

  this.save = (event) => {
    return Event.upsert({}, event).$promise;
  };

}
