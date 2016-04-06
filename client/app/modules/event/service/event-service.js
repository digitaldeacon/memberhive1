export function EventService(
  Event,
  EventTemplate
) {"ngInject";
  
  this.modify = (event) => {
    event.date = new Date(event.date);
    return event;
  };
  
  this.mapModify = (events) => _.map(events, this.modify);
  
  this.all = () => {
    return Event.find().$promise.then(this.mapModify);
  };

  this.new = (date) => {
    var event = new Event();
    event.date = date || new Date();
    return event;
  };

  this.get = (eventId) => {
    return Event.findById({id: eventId}).$promise.then(this.modify);
  };

  this.save = (event) => {
    return Event.upsert({}, event).$promise.then(this.modify);
  };
  
  this.eventsByTemplate = (templateId) => {
    return EventTemplate.events({id: templateId}).$promise.then(this.mapModify);
  };

}
