export function EventService(Event) {"ngInject";
  this.all = () => {
    return Event.find().$promise;
  };

  this.new = () => {
    return new Event();
  };

  this.get = (eventId) => {
    return Event.findById({id: eventId}).$promise;
  };

  this.save = (event) => {
    return Event.upsert({}, event).$promise;
  };

}
