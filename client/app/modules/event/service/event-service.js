export function EventService(Event) {"ngInject";
  this.all = () => {
    return Event.find().$promise;
  };

  this.new = () => {
    var event = new Event();
    event.date = new Date(); // Prefill with current date
    return event;
  };

  this.get = (eventId) => {
    return Event.findById({id: eventId}).$promise;
  };

  this.save = (event) => {
    return Event.upsert({}, event).$promise;
  };

}
